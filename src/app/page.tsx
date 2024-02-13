import SearchWindow from '@/components/Search'
import SongsList from '@/components/Songs/SongsList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12 gap-5">
      <SearchWindow />
      <SongsList />
    </main>
  )
}
