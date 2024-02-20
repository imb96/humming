'use client'

import { useEffect } from 'react'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { songsAtom, tracksAtom } from '@/stores/songsAtom'

import SongsList from '../Songs/SongsList'

const SearchResult = () => {
  const [songs] = useAtom(songsAtom)
  const [tracks] = useAtom(tracksAtom)
  const router = useRouter()

  useEffect(() => {
    if (songs.length === 0 && tracks.length === 0) {
      router.push('/')
    }
  })

  return (
    <div>
      <div className="flex gap-5">
        {tracks.length > 0 && <SongsList list={tracks} label={'Tracks'} />}
        <div className="hidden lg:block">
          {songs.length > 0 && <SongsList list={songs} label={'Albums'} />}
        </div>
      </div>
    </div>
  )
}

export default SearchResult
