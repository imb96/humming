import Header from '@/components/Header'
import SearchResult from '@/components/SearchResult'

export default function Search() {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <Header />
        <div className="flex items-center gap-2">
          <SearchResult />
        </div>
      </div>
    </div>
  )
}
