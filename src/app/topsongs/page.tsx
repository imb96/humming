import getChart from '@/api/getChart'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TopTracks } from '@/types/track'

interface Track {
  name: string
  listeners: string
  mbid: string
  url: string
  image: any
  artist: {
    name: string
  }
  streamable: string
}

const TopSongsPage = async () => {
  const res = await getChart({ method: 'chart.gettoptracks' })
  const topTracks: TopTracks[] = res.tracks.track
    .filter((item: Track) => item.name !== '(null)')
    .sort((a: Track, b: Track) => Number(b.listeners) - Number(a.listeners))
    .map((track: Track) => {
      return {
        image: track.image,
        listeners: track.listeners,
        mbid: track.mbid,
        name: track.name,
        streamable: '',
        url: track.url,
        artist: track.artist.name,
      }
    })

  return (
    <Table>
      <TableCaption>A list of top songs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Song</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Listeners</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topTracks.map((track: TopTracks) => (
          <TableRow key={track.mbid}>
            <TableCell>{track.name}</TableCell>
            <TableCell>{track.artist}</TableCell>
            <TableCell>{track.listeners}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TopSongsPage
