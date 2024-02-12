import { BASE_URL_LAST } from "./baseUrl";

interface GetMusicParams {
  method: string;
  album: string;
}

const getMusic = async (params: GetMusicParams) => {
  const url = `${BASE_URL_LAST}&method=${params.method}&album=${params.album}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("[getMusic] api Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

export default getMusic;
