'use client'

import { useEffect, useState } from 'react'

import { Song } from '@/types/song'
import { TopTracks } from '@/types/track'

import SongCard from './SongCard'
import SongsPagination from './SongsPagination'

const SongsList = ({
  list,
  label,
}: {
  list: Song[] | TopTracks[]
  label: string
}) => {
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (list.length >= 1) {
      setCount(count)
    }
  }, [count, list.length])

  if (list[count - 10] === undefined) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[400px] text-sm border-orange-400 border-[2px] rounded-lg p-[8px]">
        {label}
        {list
          .filter((item) => item.name !== '(null)')
          .slice(count - 10, count)
          .sort((a, b) => Number(b.listeners) - Number(a.listeners))
          .map((song, i) => (
            <SongCard
              song={song}
              key={song.mbid ? song.mbid : Math.random() * 100 * i}
            />
          ))}
        <SongsPagination
          count={count}
          setCount={setCount}
          length={list.length}
        />
      </div>
    </div>
  )
}

export default SongsList
