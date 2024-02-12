import { BASE_URL } from "./baseUrl";

interface Params {
  method: string;
  album: string;
}

const getMusic = async (params: Params) => {
  const url = `${BASE_URL}&method=${params.method}&album=${params.album}`;

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
