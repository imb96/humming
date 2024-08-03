import TopArtistsCard from '@/components/Artist/TopArtistsCard'
import TopSongsCard from '@/components/Song/TopSongsCard'

export default function Home() {
  return (
    <div className="flex gap-5">
      <TopArtistsCard />
      <TopSongsCard />
    </div>
  )
}
