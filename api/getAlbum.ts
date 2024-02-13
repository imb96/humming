import { BASE_URL_LAST } from './baseUrl'

interface GetAlbumParams {
  method: string
  album: string
}

const getAlbum = async (params: GetAlbumParams) => {
  const url = `${BASE_URL_LAST}&method=${params.method}&album=${params.album}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('[getAlbum] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}

export default getAlbum
