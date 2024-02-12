import Image from "next/image";

import { Song } from "@/types/songs";
import { useState } from "react";

import getVideo from "@/api/getVideo";

const SongCard = ({ song }: { song: Song }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [ytId, setYtId] = useState("");

  const iframeProps = {
    id: "ytplayer",
    type: "text/html",
    width: "100%",
    height: "200",
    src: `https://www.youtube.com/embed/${ytId}`,
    frameBorder: "0",
    allowFullScreen: true,
  };

  const handleSongCardClick = async () => {
    setIsVideoOpen(!isVideoOpen);
    const res = await getVideo({ title: `${song.name} ${song.artist}` });
    setYtId(res.items[0].id.videoId);
  };

  return (
    <>
      <div
        className="p-2 flex flex-row justify-between cursor-pointer hover:bg-gray-100 flex-1 overflow-hidden items-center"
        onClick={handleSongCardClick}
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
      {isVideoOpen && (
        <div className="flex justify-center py-2">
          <iframe {...iframeProps}></iframe>
        </div>
      )}
    </>
  );
};

export default SongCard;
