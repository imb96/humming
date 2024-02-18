import { atom } from 'jotai'

import { UserRoot } from '@/types/user'

export const userAtom = atom<UserRoot | null>(null)
