import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import { app } from '@/firebase'

const authSignUp = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const auth = getAuth(app)

  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw new Error('[authSignUp] Error' + error)
  }
}

export default authSignUp
