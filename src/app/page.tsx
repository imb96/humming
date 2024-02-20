import TopArtistList from '@/components/Artist/TopArtistList'
import TopSongList from '@/components/Songs/TopSongList'

export default function Home() {
  return (
    <div className="flex gap-5">
      <TopSongList />
      <div className="hidden lg:block">
        <TopArtistList />
      </div>
    </div>
  )
}
