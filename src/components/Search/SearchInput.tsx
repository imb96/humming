"use client";

import { useState } from "react";
import { songsAtom } from "@/store/songs";
import { useSetAtom } from "jotai";

import getMusic from "@/api/getMusic";
import SearchButton from "./SearchButton";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const setSongsAtomValue = useSetAtom(songsAtom);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await getMusic({
      method: "track.search",
      track: input,
    });

    if (res.results.trackmatches) {
      setSongsAtomValue(res.results.trackmatches.track);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-row pl-2">
        <input
          type="text"
          placeholder="Search your humming..."
          className="focus:outline-none text-xs w-[100%]"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <SearchButton disabled={input.length < 2} />
      </form>
    </>
  );
};

export default SearchInput;
