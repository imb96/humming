'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authSignIn, authSignUp } from '@/firebase'

const signInSchema = z.object({
  email: z.string().email({ message: '이메일이 유효하지 않습니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
})

const signUpSchema = z
  .object({
    email: z.string().email({ message: '이메일이 유효하지 않습니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 다릅니다.',
    path: ['confirmPassword'],
  })

type SignInFormValues = z.infer<typeof signInSchema>
type SignUpFormValues = z.infer<typeof signUpSchema>

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const router = useRouter()

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorSignIn },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  })

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorSignUp },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const onSignIn = (data: SignInFormValues) => {
    console.log(data)
    authSignIn({ email: data.email, password: data.password })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onSignUp = (data: SignUpFormValues) => {
    console.log(data)
    authSignUp({ email: data.email, password: data.password })
      .then(() => {
        router.refresh()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex justify-center">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmitSignIn(onSignIn)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="signInEmail">Email</Label>
                  <Input
                    {...registerSignIn('email')}
                    id="signInEmail"
                    placeholder="geurim@humming.com"
                  />
                  {errorSignIn.email && (
                    <p className="text-sm text-red-500">
                      {errorSignIn.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...registerSignIn('password')}
                    id="username"
                    type="password"
                    placeholder="***********"
                  />
                  {errorSignIn.password && (
                    <p className="text-sm text-red-500">
                      {errorSignIn.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign in</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmitSignUp(onSignUp)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="signUpEmail">Email</Label>
                  <Input
                    {...registerSignUp('email')}
                    id="signUpEmail"
                    type="email"
                    placeholder="geurim@humming.com"
                  />
                  {errorSignUp.email && (
                    <p className="text-sm text-red-500">
                      {errorSignUp.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...registerSignUp('password')}
                    id="password"
                    type="password"
                    placeholder="***********"
                  />
                  {errorSignUp.password && (
                    <p className="text-sm text-red-500">
                      {errorSignUp.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    {...registerSignUp('confirmPassword')}
                    id="confirmPassword"
                    type="password"
                    placeholder="***********"
                  />
                  {errorSignUp.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errorSignUp.confirmPassword.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign up</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AccountPage
