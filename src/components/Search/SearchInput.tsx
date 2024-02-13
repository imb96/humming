'use client'

import { useEffect, useState } from 'react'
import { songsAtom } from '@/store/songs'
import { useSetAtom } from 'jotai'
import getMusic from '@/api/getMusic'
import SearchButton from './SearchButton'
import getTopMusic from '@/api/getTopMusic'

interface Track {
  image: string
  listeners: string
  name: string
  streamable: string
  url: string
  mbid: string
  artist: {
    name: string
  }
}

const SearchInput = () => {
  const [input, setInput] = useState('')

  const setSongsAtomValue = useSetAtom(songsAtom)

  useEffect(() => {
    ;(async () => {
      const res = await getTopMusic()
      if (res.tracks.track) {
        const topSongs = res.tracks.track.map((track: Track) => {
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
        console.log(topSongs)
        setSongsAtomValue(topSongs)
      }
    })()
  }, [setSongsAtomValue])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await getMusic({
      method: 'album.search',
      album: input,
    })

    if (res.results.albummatches) {
      console.log(res.results.albummatches.album)
      setSongsAtomValue(res.results.albummatches.album)
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
