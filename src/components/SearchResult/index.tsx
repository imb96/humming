'use client'

import { useEffect } from 'react'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { songsAtom, tracksAtom } from '@/stores/songsAtom'

import CardList from '../CardList'

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
      <div className="flex flex-col gap-5 md:flex-row">
        <div>
          {tracks.length > 0 && <CardList list={tracks} label={'Songs'} />}
        </div>
        <div>
          {songs.length > 0 && <CardList list={songs} label={'Albums'} />}
        </div>
      </div>
    </div>
  )
}

export default SearchResult
