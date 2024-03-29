'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { authSignIn } from '@/firebase'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSignIn = () => {
    authSignIn({ email, password })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSignUp = () => {
    router.push('/signup')
  }

  return (
    <div className="flex flex-col px-5 gap-2 pt-5 rounded p-[8px] min-w-[360px] h-[360px]">
      <div className="flex justify-center pb-10 text-orange-500 font-bold text-2xl">
        {'Humming'}
      </div>
      <div className="flex flex-col gap-5">
        <div className="border-[1px] rounded">
          <input
            name="email"
            placeholder="email"
            onChange={handleChangeEmail}
            className="p-3 focus:outline-orange-500 w-full"
          />
        </div>
        <div className="border-[1px] rounded">
          <input
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChangePassword}
            className="p-3 focus:outline-orange-500 w-full"
          />
        </div>
      </div>
      <div className="flex justify-center text-sm font-light text-gray-500 pt-[30px]">
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <div className="flex pt-[30px]">
        <button
          onClick={handleSignIn}
          aria-label="SignIn"
          className="bg-orange-500 w-full h-[40px] rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}

export default SignIn
