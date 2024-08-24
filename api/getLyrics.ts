import { GENIUS_BASE_URL } from './baseUrl'

type GetLyricsProps = {
  id: string
}

const getLyrics = async ({ id }: GetLyricsProps) => {
  const url = `${GENIUS_BASE_URL}/song/lyrics/?id=${id}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (process.env.NEXT_PUBLIC_RAPID_API_KEY) {
    headers['X-RapidAPI-Key'] = process.env.NEXT_PUBLIC_RAPID_API_KEY
  }

  const res = await fetch(url, {
    method: 'GET',
    headers,
  })

  if (!res.ok) {
    throw new Error('GET: [getTrack] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}

export default getLyrics
