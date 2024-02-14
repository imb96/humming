import getTopMusic from '@/api/getTopMusic'
import { TopTracks } from '@/types/track'

const TopSongList = async () => {
  const res = await getTopMusic()
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
      <div className="w-[500px] text-sm border-orange-400 border-[2px] rounded-lg p-[0 8px 8px 8px] h-[510px] overflow-auto">
        <div className="flex sticky top-0 py-[8px] pl-[8px] font-semibold bg-orange-100">
          {'Top Tracks 🚀'}
        </div>
        {topTracks
          .filter((item: TopTracks) => item.name !== '(null)')
          .sort(
            (a: TopTracks, b: TopTracks) =>
              Number(b.listeners) - Number(a.listeners),
          )
          .map((song: TopTracks, i: number) => (
            <div
              key={song.mbid ? song.mbid : Math.random() * 100 * i}
              className="p-2 flex flex-row justify-between cursor-pointer hover:bg-gray-100 flex-1 overflow-hidden items-center"
            >
              <div className="flex flex-row gap-2 items-center">
                <div>{i + 1}.</div>
                <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {song.name}
                </div>
              </div>
              <div className="text-[10px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {song.artist}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TopSongList
