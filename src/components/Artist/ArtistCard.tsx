'use client'

import { useState } from 'react'

import getTopTrackByArtist from '@/api/getTopTrackByArtist'
import getVideo from '@/api/getVideo'
import { Artist } from '@/types/artist'

const ArtistCard = ({ rank, artist }: { rank?: number; artist: Artist }) => {
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

  const handleArtistCardClick = async () => {
    setIsVideoOpen(!isVideoOpen)
    const track = await getTopTrackByArtist(artist.name)
    const res = await getVideo({
      title: `${artist.name} ${track.toptracks.track[0].name}`,
    })
    setYtId(res.items[0].id.videoId)
  }

  return (
    <>
      <div
        className="p-2 flex flex-row justify-between cursor-pointer hover:bg-gray-100 flex-1 overflow-hidden items-center"
        onClick={handleArtistCardClick}
      >
        <div className="flex flex-row gap-2 items-center">
          {rank}
          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {artist.name}
          </div>
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

export default ArtistCard
