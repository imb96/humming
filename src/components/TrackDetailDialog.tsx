import { useState } from 'react'

import { getVideo } from '@/api/getVideo'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type TrackDetailDialogProps = {
  title: string
  artist: string
  image: string
  trackKey: string
}

const TrackDetailDialog = ({
  title,
  artist,
  image,
}: TrackDetailDialogProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [ytId, setYtId] = useState('')

  const handleClick = async () => {
    setIsVideoOpen(!isVideoOpen)
    if (!ytId) {
      const res = await getVideo({ title: `${title} ${artist}` })
      setYtId(res.items[0].id.videoId)
    }
  }

  const iframeProps = {
    id: 'ytplayer',
    type: 'text/html',
    width: '100%',
    height: '400',
    src: `https://www.youtube.com/embed/${ytId}`,
    frameBorder: '0',
    allowFullScreen: true,
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden sm:max-w-[375px] md:h-[600px] md:max-w-[768px]"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {isVideoOpen ? (
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        ) : null}
        <div className="relative z-10">
          <DialogHeader>
            <div className="flex flex-row gap-2">
              <DialogTitle className="text-white">{title}</DialogTitle>
              <DialogDescription className="text-gray-300">
                - {artist}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center py-2">
              <Button onClick={handleClick}>
                {isVideoOpen ? 'Close Video' : 'Show Video'}
              </Button>
            </div>
            <div>
              {isVideoOpen && (
                <div className="flex justify-center py-2">
                  <iframe {...iframeProps}></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TrackDetailDialog
