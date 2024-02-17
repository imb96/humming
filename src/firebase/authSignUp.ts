import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import { app } from '@/firebase'
import { UserAuth } from '@/types/user'

const authSignUp = ({ email, password }: UserAuth) => {
  const auth = getAuth(app)

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      throw new Error(`[${errorCode}] ${errorMessage}`)
    })
}

export default authSignUp
