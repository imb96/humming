import { BASE_URL_LAST } from './baseUrl'

const getTopTrackWithArtist = async (artist: string) => {
  const url = `${BASE_URL_LAST}&method=artist.gettoptracks&limit=1&artist=${artist}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('[getTopTrackWithArtist] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}

export default getTopTrackWithArtist
