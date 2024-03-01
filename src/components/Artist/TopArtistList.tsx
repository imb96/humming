import getChart from '@/api/getChart'
import { Artist } from '@/types/artist'

import CardList from '../CardList'

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
    <CardList list={topArtists} label={'Top Artist 50 🚀'} isRanked={true} />
  )
}

export default TopArtistList
