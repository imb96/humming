"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { songsAtom } from "@/store/songs";
import Image from "next/image";

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
          .slice(count - 10, count)
          .sort((a, b) => Number(b.listeners) - Number(a.listeners))
          .map((song, i) => (
            <div
              key={song.mbid ? song.mbid : Math.random() * 100 * i}
              className="p-2 flex flex-row justify-between"
            >
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src={
                    song.image[0]["#text"]
                      ? song.image[0]["#text"]
                      : "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
                  }
                  alt="album image"
                  width={32}
                  height={32}
                />
                <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {song.name}
                </div>
              </div>
              <div className="text-[10px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {song.artist}
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-2 pb-5">
        <button
          onClick={() => setCount((prev) => prev - 10)}
          disabled={count === 10}
          className="disabled:opacity-20"
        >
          {"<"}
        </button>
        <div>
          {count / 10} / {Math.ceil(songs.length / 10)}
        </div>
        <button
          onClick={() => setCount((prev) => prev + 10)}
          disabled={count / 10 === Math.ceil(songs.length / 10)}
          className="disabled:opacity-20"
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default SongsList;
