import Image from "next/image";

import { Song } from "@/types/songs";

const SongCard = ({ song }: { song: Song }) => {
  return (
    <div className="p-2 flex flex-row justify-between">
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
  );
};

export default SongCard;
