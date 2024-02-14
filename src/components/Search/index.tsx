import SearchInput from './SearchInput'

const Search = () => {
  return (
    <div className="flex items-center border-solid focus-within:border-orange-400 border-[2px] rounded-full p-[8px] min-w-[360px] h-[50px]">
      <SearchInput />
    </div>
  )
}

export default Search
