import { UserCredential } from 'firebase/auth'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const userAtom = atom<UserCredential | null>(null)
export const userTokenAtom = atomWithStorage('userToken', '')
