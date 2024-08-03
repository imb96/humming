import getChart from '@/api/getChart'
import { TopTracks } from '@/types/track'

import CardList from '../CardList'

const TopSongsCard = async () => {
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

  return <CardList list={topTracks} label="Top Songs 50 🚀" isRanked={true} />
}

export default TopSongsCard
