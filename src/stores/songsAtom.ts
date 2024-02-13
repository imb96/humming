import { atom } from 'jotai'

import { Song } from '@/types/song'
import { TopTracks } from '@/types/track'

export const songsAtom = atom<Song[]>([])
export const topTracksAtom = atom<TopTracks[]>([])
export const tracksAtom = atom<Song[]>([])
