import TopArtistList from '@/components/Artist/TopArtistList'
import TopTrackList from '@/components/Track/TopTrackList'

export default function Home() {
  return (
    <div className="flex gap-5">
      <TopTrackList />
      <div className="hidden lg:block">
        <TopArtistList />
      </div>
    </div>
  )
}
