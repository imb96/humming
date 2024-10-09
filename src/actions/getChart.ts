'use server'

import { BASE_URL_LAST } from '@/api/baseUrl'

interface GetChartProps {
  method: string
}

export async function getChart({ method }: GetChartProps) {
  const url = `${BASE_URL_LAST}&method=${method}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const res = await fetch(url, {
    method: 'GET',
    headers,
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error('[getChart] api Failed to fetch data')
  }

  const data = await res.json()
  return data
}
