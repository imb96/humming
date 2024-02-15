import { BASE_URL_LAST } from './baseUrl'

interface getChartProps {
  method: string
}

const getChart = async ({ method }: getChartProps) => {
  const url = `${BASE_URL_LAST}&method=${method}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('[getChart] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}

export default getChart
