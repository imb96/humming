import TopArtistsCard from '@/components/Artist/TopArtistsCard'
import Header from '@/components/Header'
import TopSongsCard from '@/components/Song/TopSongsCard'

export default function Home() {
  return (
    <div className="flex justify-center gap-5">
      <div className="flex flex-col items-center">
        <Header />
      </div>
    </div>
  )
}
