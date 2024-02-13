import Main from '@/components/Main'
import SearchWindow from '@/components/Search'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12 gap-5">
      <SearchWindow />
      <div className="flex justify-start">
        <Main />
      </div>
    </main>
  )
}
