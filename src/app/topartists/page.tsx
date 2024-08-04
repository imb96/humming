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
import { Artist } from '@/types/artist'

const TopArtistsPage = async () => {
  const res = await getChart({ method: 'chart.gettopartists' })
  const topArtists = res.artists.artist
    .filter((item: Artist) => item.name !== '(null)')
    .sort((a: Artist, b: Artist) => Number(b.listeners) - Number(a.listeners))
    .map((artist: Artist) => {
      return {
        image: artist.image,
        listeners: artist.listeners,
        mbid: artist.mbid,
        name: artist.name,
        streamable: '',
        url: artist.url,
      }
    })

  return (
    <Table>
      <TableCaption>A list of top artists.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Artist</TableHead>
          <TableHead>Listeners</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topArtists.map((artist: Artist) => (
          <TableRow key={artist.mbid}>
            <TableCell>{artist.name}</TableCell>
            <TableCell>{artist.listeners}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TopArtistsPage
