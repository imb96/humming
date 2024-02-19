'use client'

import { useState } from 'react'

import { useSetAtom } from 'jotai'
import { SetStateAction } from 'jotai/vanilla'
import { useRouter } from 'next/navigation'

import getAlbum from '@/api/getAlbum'
import getTrack from '@/api/getTrack'
import getTrackByLyrics from '@/api/getTrackByLyrics'
import { songsAtom, tracksAtom } from '@/stores/songsAtom'
import { Track } from '@/types/lyricsTrack'

import SearchButton from './SearchButton'

const SearchInput = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}) => {
  const [input, setInput] = useState('')
  const [searchType, setSearchType] = useState('song')
  const router = useRouter()

  const setAlbumsAtomValue = useSetAtom(songsAtom)
  const setTracksAtom = useSetAtom(tracksAtom)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

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
      const song = await getTrackByLyrics(input)
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
    router.push('/search')
    setIsLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row px-2 justify-between w-full"
      >
        <select
          value={searchType}
          onChange={handleSelectChange}
          className="text-xs"
          aria-label="search-type"
        >
          <option value="song">제목/가수</option>
          <option value="lyrics">가사</option>
        </select>
        <input
          type="text"
          placeholder="Search your humming..."
          className="focus:outline-none text-xs w-[100%] pl-5"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <SearchButton disabled={input.length < 2} />
      </form>
    </>
  )
}

export default SearchInput
