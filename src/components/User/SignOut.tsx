'use client'

import { useAtom, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { authSignOut } from '@/firebase'
import { userAtom, userTokenAtom } from '@/stores/userAtom'

const SignOut = () => {
  const router = useRouter()
  const setUserAtom = useSetAtom(userAtom)
  const [token, setToken] = useAtom(userTokenAtom)

  const handleSignOut = () => {
    authSignOut()
      .then(() => {
        router.push('/')
        setUserAtom(null)
        setToken('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="border-[1px] rounded">
      <button
        onClick={handleSignOut}
        aria-label="Sign Out"
        className="flex justify-center items-center w-[200px] h-[40px] rounded p-5 bg-orange-500 text-white"
      >
        {'Sign Out'}
      </button>
    </div>
  )
}

export default SignOut
