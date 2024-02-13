export const BASE_URL_LAST = `https://ws.audioscrobbler.com/2.0/?api_key=${process.env.NEXT_PUBLIC_API_KEY}&format=json`
export const BASE_URL_YT = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&key=${process.env.NEXT_PUBLIC_YT_API_KEY}`
