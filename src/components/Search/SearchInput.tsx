'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import getTrack from '@/api/getTrack'
import TrackDetailDialog from '@/components/TrackDetailDialog'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

type Track = {
  track: {
    key: string
    title: string
    subtitle: string
    share: {
      image: string
    }
  }
}

const SearchInput = () => {
  const [input, setInput] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchTracks = async (
    searchTerm: string,
    currentOffset: number,
    isInitialSearch = false,
  ) => {
    setIsLoading(true)
    try {
      const res = await getTrack({
        name: searchTerm,
        offset: currentOffset,
      })

      if (res && res.tracks && res.tracks.hits) {
        if (isInitialSearch) {
          setTracks(res.tracks.hits)
        } else {
          setTracks((prevTracks) => [...prevTracks, ...res.tracks.hits])
        }
        setOffset(currentOffset + res.tracks.hits.length)
      }
    } catch (error) {
      console.error('Error fetching tracks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOffset(0)
    await fetchTracks(input, 0, true)
  }

  const handleLoadMore = async () => {
    await fetchTracks(input, offset)
  }

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-row justify-between gap-5 px-2"
      >
        <Input
          type="text"
          className="w-[100%] pl-5 text-xs focus:outline-none"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tracks.map((track, idx) => (
              <TableRow key={track.track.key}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Image
                      src={track.track.share.image}
                      alt="bgc"
                      width={20}
                      height={20}
                      className="hidden sm:block"
                    />
                    <div>{track.track.title}</div>
                  </div>
                </TableCell>
                <TableCell>{track.track.subtitle}</TableCell>
                <TableCell>
                  <TrackDetailDialog
                    title={track.track.title}
                    artist={track.track.subtitle}
                    image={track.track.share.image}
                    trackKey={track.track.key}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tracks.length > 0 && (
          <Button
            onClick={handleLoadMore}
            className="mt-4 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default SearchInput
