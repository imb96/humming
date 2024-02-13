'use client'

import { useEffect, useState } from 'react'

import { useSetAtom } from 'jotai'

import getAlbum from '@/api/getAlbum'
import getTopMusic from '@/api/getTopMusic'
import getTrack from '@/api/getTrack'
import { songsAtom, topTracksAtom, tracksAtom } from '@/stores/songsAtom'
import { TopTracks } from '@/types/track'

import SearchButton from './SearchButton'

const SearchInput = () => {
  const [input, setInput] = useState('')

  const setTopTracksAtom = useSetAtom(topTracksAtom)
  const setAlbumsAtomValue = useSetAtom(songsAtom)
  const setTracksAtom = useSetAtom(tracksAtom)

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

    const res = await getAlbum({
      method: 'album.search',
      album: input,
    })

    const res2 = await getTrack({
      method: 'track.search',
      track: input,
    })

    if (res.results.albummatches) {
      setAlbumsAtomValue(res.results.albummatches.album)
    }

    if (res2.results.trackmatches) {
      setTracksAtom(res2.results.trackmatches.track)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-row pl-2">
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
