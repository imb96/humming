'use client'

import React, { useState } from 'react'

import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import getAlbum from '@/api/getAlbum'
import getTrack from '@/api/getTrack'
import getTrackByLyrics from '@/api/getTrackByLyrics'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { songsAtom, tracksAtom } from '@/stores/songsAtom'
import { Track } from '@/types/lyricsTrack'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

const SearchInput = () => {
  const [input, setInput] = useState('')
  const [searchType, setSearchType] = useState('song')
  const router = useRouter()

  const setAlbumsAtomValue = useSetAtom(songsAtom)
  const setTracksAtom = useSetAtom(tracksAtom)

  const handleSelectChange = (value: string) => {
    setSearchType(value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (searchType === 'song') {
      const albums = await getAlbum({
        method: 'album.search',
        album: input,
      })

      const tracks = await getTrack({
        method: 'track.search',
        track: input,
      })

      if (albums.results.albummatches) {
        setAlbumsAtomValue(albums.results.albummatches.album)
      }

      if (tracks.results.trackmatches) {
        setTracksAtom(tracks.results.trackmatches.track)
      }
    }

    if (searchType === 'lyrics') {
      const song = await getTrackByLyrics(input)
      const tracksWithLyric = song.message.body.track_list.map(
        ({ track }: { track: Track }) => {
          return {
            image: [{ size: '', '#test': '' }],
            listeners: '',
            mbid: track.commontrack_id,
            name: track.track_name,
            streamable: '',
            url: '',
            artist: track.artist_name,
          }
        },
      )
      setTracksAtom(tracksWithLyric)
      setAlbumsAtomValue([])
    }
    router.push('/search')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-row justify-between gap-5 px-2"
      >
        <Select value={searchType} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="song">제목/가수</SelectItem>
            <SelectItem value="lyrics">가사</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          className="w-[100%] pl-5 text-xs focus:outline-none"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <Button>검색</Button>
      </form>
    </>
  )
}

export default SearchInput
