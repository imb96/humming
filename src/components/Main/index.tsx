'use client'

import { useAtom } from 'jotai'

import { songsAtom, topTracksAtom, tracksAtom } from '@/stores/songsAtom'

import SongsList from '../Songs/SongsList'

const Main = () => {
  const [songs] = useAtom(songsAtom)
  const [topTracks] = useAtom(topTracksAtom)
  const [tracks] = useAtom(tracksAtom)

  return (
    <div>
      <div className="flex pt-12 gap-5">
        {songs.length === 0 && tracks.length === 0 && (
          <SongsList list={topTracks} label={'Top Tracks'} />
        )}
        <SongsList list={songs} label={'Albums'} />
        <SongsList list={tracks} label={'Tracks'} />
      </div>
    </div>
  )
}

export default Main
