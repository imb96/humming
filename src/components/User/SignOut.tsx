'use client'

import { useRouter } from 'next/navigation'

import { authSignOut } from '@/firebase'

const SignOut = () => {
  const router = useRouter()

  const handleSignOut = () => {
    authSignOut()
      .then(() => {
        router.push('/')
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
