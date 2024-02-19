import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { app } from '@/firebase'

const authSignIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const auth = getAuth(app)

  try {
    await setPersistence(auth, browserLocalPersistence)
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    throw new Error('[authSignIn] Error')
  }
}

export default authSignIn
