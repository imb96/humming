import SearchInput from '@/components/Search/SearchInput'

export default function Home() {
  return (
    <div className="flex justify-center gap-5">
      <div className="flex flex-col items-center">
        <SearchInput />
      </div>
    </div>
  )
}
