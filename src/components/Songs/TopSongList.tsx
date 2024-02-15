import getChart from '@/api/getChart'
import { TopTracks } from '@/types/track'

import SongCard from './SongCard'

const TopSongList = async () => {
  const res = await getChart({ method: 'chart.gettoptracks' })
  const topTracks = res.tracks.track.map((track: TopTracks) => {
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

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[500px] text-sm border-orange-400 border-[2px] rounded-lg p-[0 8px 8px 8px] h-[510px] overflow-auto scroll-smooth scrollbar-hide">
        <div className="flex sticky top-0 py-[8px] pl-[8px] font-semibold bg-orange-100 items-center gap-2">
          {'Top Track 50 🚀'}
          <span className="text-xs font-light">Click to watch the video!</span>
        </div>
        {topTracks
          .filter((item: TopTracks) => item.name !== '(null)')
          .map((song: TopTracks, i: number) => (
            <SongCard
              song={song}
              key={song.mbid ? song.mbid : Math.random() * 100 * i}
              rank={i + 1}
            />
          ))}
      </div>
    </div>
  )
}

export default TopSongList
