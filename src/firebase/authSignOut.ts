import { getAuth, signOut } from 'firebase/auth'

import { app } from '@/firebase'

const SignOut = () => {
  const auth = getAuth(app)
  signOut(auth)
    .then(() => {
      console.log('sign out success')
    })
    .catch((error) => {
      console.log('sign out error', error)
    })
}

export default SignOut
