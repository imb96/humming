'use client'

import { useState } from 'react'

import { getVideo } from '@/api/getVideo'
import { Artist } from '@/types/artist'
import { Song } from '@/types/song'
import { TopTracks } from '@/types/track'

const Card = ({
  item,
  rank,
}: {
  item: Song | TopTracks | Artist
  rank?: number
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [ytId, setYtId] = useState('')

  const iframeProps = {
    id: 'ytplayer',
    type: 'text/html',
    width: '100%',
    height: '200',
    src: `https://www.youtube.com/embed/${ytId}`,
    frameBorder: '0',
    allowFullScreen: true,
  }

  const handleClick = async () => {
    setIsVideoOpen(!isVideoOpen)
    const res = await getVideo({ title: `${item.name} ${item.artist}` })
    setYtId(res.items[0].id.videoId)
  }

  return (
    <>
      <div
        className="flex flex-1 cursor-pointer flex-row items-center justify-between overflow-hidden p-2 hover:bg-gray-100"
        onClick={handleClick}
      >
        <div className="flex flex-row items-center gap-2 truncate">
          {rank}
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {item.name}
          </div>
        </div>
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[10px]">
          {item.artist}
        </div>
      </div>
      {isVideoOpen && (
        <div className="flex justify-center py-2">
          <iframe {...iframeProps}></iframe>
        </div>
      )}
    </>
  )
}

export default Card
