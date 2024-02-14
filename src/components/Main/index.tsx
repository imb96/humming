'use client'

import { useAtom } from 'jotai'

import { songsAtom, tracksAtom } from '@/stores/songsAtom'

import SongsList from '../Songs/SongsList'

const Main = () => {
  const [songs] = useAtom(songsAtom)
  const [tracks] = useAtom(tracksAtom)

  return (
    <div>
      <div className="flex gap-5">
        <SongsList list={songs} label={'Albums'} />
        <SongsList list={tracks} label={'Tracks'} />
      </div>
    </div>
  )
}

export default Main
