'use client'

import { useState } from 'react'

import SearchInput from './SearchInput'

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div
      className={`flex items-center focus-within:border-orange-400 border-[2px] rounded-full p-[8px] min-w-[360px] max-w-[500px] h-[50px] ${isLoading ? 'border-dotted' : 'border-solid'}`}
    >
      <SearchInput setIsLoading={setIsLoading} />
    </div>
  )
}

export default Search
