import { atom } from 'jotai'
import { Song } from '@/types/songs'

export const songsAtom = atom<Song[]>([])
