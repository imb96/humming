import { getChart } from '@/actions/getChart'
import { Artist } from '@/types/artist'

import CardList from '../CardList'

const TopArtistsCard = async () => {
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
    <CardList list={topArtists} label={'Top Artist 50 🚀'} isRanked={true} />
  )
}

export default TopArtistsCard
