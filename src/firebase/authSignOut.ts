import { getAuth, signOut } from 'firebase/auth'

import { app } from '@/firebase'

const autoSignOut = () => {
  const auth = getAuth(app)

  try {
    const user = signOut(auth)
    return user
  } catch (error) {
    throw new Error('[authSignOut] Error')
  }
}

export default autoSignOut
