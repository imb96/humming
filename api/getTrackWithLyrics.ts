const getTrackWithLyrics = async (lyrics: string) => {
  const url = `api/track.search?page_size=10&page=5&s_track_rating=desc&apikey=9466dc0e080a511ceee8ab798a730645&country=82&q_lyrics=${lyrics}`

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

export default getTrackWithLyrics