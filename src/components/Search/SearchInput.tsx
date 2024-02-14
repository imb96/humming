'use client'

import { useEffect, useState } from 'react'

import { useSetAtom } from 'jotai'

import getAlbum from '@/api/getAlbum'
import getTopMusic from '@/api/getTopMusic'
import getTrack from '@/api/getTrack'
import getTrackWithLyrics from '@/api/getTrackWithLyrics'
import { songsAtom, topTracksAtom, tracksAtom } from '@/stores/songsAtom'
import { Track } from '@/types/lyricsTrack'
import { TopTracks } from '@/types/track'

import SearchButton from './SearchButton'

const SearchInput = () => {
  const [input, setInput] = useState('')
  const [searchType, setSearchType] = useState('song')

  const setTopTracksAtom = useSetAtom(topTracksAtom)
  const setAlbumsAtomValue = useSetAtom(songsAtom)
  const setTracksAtom = useSetAtom(tracksAtom)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value)
  }

  useEffect(() => {
    ;(async () => {
      const res = await getTopMusic()
      if (res.tracks.track) {
        const topTracks = res.tracks.track.map((track: TopTracks) => {
          return {
            image: track.image,
            listeners: track.listeners,
            mbid: track.mbid,
            name: track.name,
            streamable: '',
            url: track.url,
            artist: track.artist.name,
          }
        })
        setTopTracksAtom(topTracks)
      }
    })()
  }, [setTopTracksAtom])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (searchType === 'song') {
      const albums = await getAlbum({
        method: 'album.search',
        album: input,
      })

      const tracks = await getTrack({
        method: 'track.search',
        track: input,
      })

      if (albums.results.albummatches) {
        setAlbumsAtomValue(albums.results.albummatches.album)
      }

      if (tracks.results.trackmatches) {
        setTracksAtom(tracks.results.trackmatches.track)
      }
    }

    if (searchType === 'lyrics') {
      const song = await getTrackWithLyrics(input)

      if (song.message.body.track_list.length > 0) {
        const tracksWithLyric = song.message.body.track_list.map(
          ({ track }: { track: Track }) => {
            return {
              image: [{ size: '', '#test': '' }],
              listeners: '',
              mbid: track.commontrack_id,
              name: track.track_name,
              streamable: '',
              url: '',
              artist: track.artist_name,
            }
          },
        )
        setTracksAtom(tracksWithLyric)
        setAlbumsAtomValue([])
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row pl-2 justify-between w-full"
      >
        <select
          value={searchType}
          onChange={handleSelectChange}
          className="text-xs"
        >
          <option value="song">제목/가수</option>
          <option value="lyrics">가사</option>
        </select>
        <input
          type="text"
          placeholder="Search your humming..."
          className="focus:outline-none text-xs w-[100%]"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <SearchButton disabled={input.length < 2} />
      </form>
    </>
  )
}

export default SearchInput
