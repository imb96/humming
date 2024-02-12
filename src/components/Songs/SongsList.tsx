"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { songsAtom } from "@/store/songs";

import SongCard from "./SongCard";
import SongsPagination from "./SongsPagination";

const SongsList = () => {
  const [songs] = useAtom(songsAtom);
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (songs.length >= 1) {
      setCount(count);
    }
  }, [count, songs.length]);

  if (songs[count - 10] === undefined) return null;

  return (
    <>
      <div className="flex flex-col justify-center w-[400px] text-sm border-orange-400 border-[2px] rounded-lg p-[8px]">
        {songs
          .filter((song) => song.name !== "(null)")
          .slice(count - 10, count)
          .sort((a, b) => Number(b.listeners) - Number(a.listeners))
          .map((song, i) => (
            <SongCard
              song={song}
              key={song.mbid ? song.mbid : Math.random() * 100 * i}
            />
          ))}
      </div>
      <SongsPagination
        count={count}
        setCount={setCount}
        length={songs.length}
      />
    </>
  );
};

export default SongsList;
