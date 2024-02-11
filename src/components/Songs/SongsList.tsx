import { songsAtom } from "@/store/songs";
import { useAtom } from "jotai";

const SongsList = () => {
  const [songs] = useAtom(songsAtom);

  return (
    <div className="flex flex-col">
      {songs
        .sort((a, b) => Number(b.listeners) - Number(a.listeners))
        .map((song, i) => (
          <a key={song.mbid ? song.mbid : Math.random() * 100 * i}>
            {song.name}({song.artist})
          </a>
        ))}
    </div>
  );
};

export default SongsList;
