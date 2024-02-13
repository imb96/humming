import { BASE_URL_LAST } from './baseUrl'

interface GetTrackProps {
  method: string
  track: string
}

const getTrack = async (params: GetTrackProps) => {
  const url = `${BASE_URL_LAST}&method=${params.method}&track=${params.track}&limit=50`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('[getTrack] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}

export default getTrack
