'use client'

import { useState } from 'react'

import SearchInput from './SearchInput'

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div
      className={`flex h-[50px] w-[500px] min-w-[140px] items-center rounded-full border-[2px] p-[8px] focus-within:border-black ${isLoading ? 'border-dotted' : 'border-solid'}`}
    >
      <SearchInput setIsLoading={setIsLoading} />
    </div>
  )
}

export default Search
