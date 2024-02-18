import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { app } from '@/firebase'
import { UserAuth } from '@/types/user'

const authSignIn = async ({ email, password }: UserAuth) => {
  const auth = getAuth(app)

  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    throw new Error('[authSignIn] Error')
  }
}

export default authSignIn
