'use client'

import { useState } from 'react'

import SearchInput from './SearchInput'

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div
      className={`flex items-center w-[500px] min-w-[140px] focus-within:border-orange-400 border-[2px] rounded-full p-[8px] h-[50px] ${isLoading ? 'border-dotted' : 'border-solid'}`}
    >
      <SearchInput setIsLoading={setIsLoading} />
    </div>
  )
}

export default Search
