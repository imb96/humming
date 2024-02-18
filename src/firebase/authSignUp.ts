import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import { app } from '@/firebase'
import { UserAuth } from '@/types/user'

const authSignUp = async ({ email, password }: UserAuth) => {
  const auth = getAuth(app)

  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    throw new Error('[authSignUp] Error')
  }
}

export default authSignUp
