'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { authSignUp } from '@/firebase'

interface InputTypes {
  email: string
  password: string
}

interface SignUpProps {
  email: Pick<InputTypes, 'email'>
  password: Pick<InputTypes, 'password'>
  success: boolean
  failed: boolean
  message: string
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<InputTypes>()

  const router = useRouter()

  const handleSignIn = () => {
    router.push('/signin')
  }

  const handleSignUp: SubmitHandler<InputTypes> = (data) => {
    authSignUp({ email: data.email, password: data.password })
      .then(() => {
        router.push('/signin')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form
      className="flex h-[360px] min-w-[360px] flex-col gap-2 rounded p-[8px] px-5 pt-5"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <div className="flex justify-center pb-10 text-2xl font-bold text-orange-500">
        {'Humming'}
      </div>
      <div className="flex flex-col gap-5">
        <div className="rounded border-[1px]">
          <input
            {...register('email')}
            placeholder={'example@humming.com'}
            className="w-full p-3 focus:outline-orange-500"
          />
        </div>
        <div className="rounded border-[1px]">
          <input
            {...register('password')}
            placeholder={'password'}
            type="password"
            className="w-full p-3 focus:outline-orange-500"
          />
        </div>
      </div>
      <div className="flex justify-center pt-[30px] text-sm font-light text-gray-500">
        <button onClick={handleSignIn}>Sign In</button>
      </div>
      <div className="flex pt-[30px]">
        <button
          aria-label="SignIn"
          className="h-[40px] w-full rounded bg-orange-500"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignUp
