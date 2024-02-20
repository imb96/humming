import getChart from '@/api/getChart'
import { Artist } from '@/types/artist'

import ArtistCard from './ArtistCard'

const TopArtistList = async () => {
  const res = await getChart({ method: 'chart.gettopartists' })
  const topArtists = res.artists.artist.map((artist: Artist) => {
    return {
      image: artist.image,
      listeners: artist.listeners,
      mbid: artist.mbid,
      name: artist.name,
      streamable: '',
      url: artist.url,
    }
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[360px] text-sm border-orange-400 border-[2px] rounded-lg p-[0 8px 8px 8px] h-[510px] overflow-auto scroll-smooth scrollbar-hide">
        <div className="flex sticky top-0 py-[8px] pl-[8px] font-semibold bg-orange-100 items-center gap-2">
          {'Top Artist 50 🚀'}
          <span className="text-xs font-light">Click to watch the video!</span>
        </div>
        {topArtists
          .filter((item: Artist) => item.name !== '(null)')
          .map((artist: Artist, i: number) => (
            <ArtistCard
              artist={artist}
              key={artist.mbid ? artist.mbid : Math.random() * 100 * i}
              rank={i + 1}
            />
          ))}
      </div>
    </div>
  )
}

export default TopArtistList
