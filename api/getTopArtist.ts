import { BASE_URL_LAST } from './baseUrl'

const getTopArtist = async () => {
  const url = `${BASE_URL_LAST}&method=chart.gettopartists`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('[getTopArtist] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}

export default getTopArtist
