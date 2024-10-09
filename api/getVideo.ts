import { BASE_URL_YT } from './baseUrl'

interface GetVideoParams {
  title: string
}

export async function getVideo(params: GetVideoParams) {
  const url = `${BASE_URL_YT}&q=${params.title}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('[getVideo] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}
