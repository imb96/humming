'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { onAuthStateChanged } from 'firebase/auth'
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
import { useToast } from '@/components/ui/use-toast'
import { auth } from '@/firebase'
import { authSignIn, authSignUp } from '@/firebase'

const passwordSchema = z
  .string()
  .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  .regex(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: '비밀번호는 최소 하나의 특수문자(@$!%*?&)를 포함해야 합니다.',
  })

const signInSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})

const signUpSchema = z
  .object({
    email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

type SignInFormValues = z.infer<typeof signInSchema>
type SignUpFormValues = z.infer<typeof signUpSchema>

const AccountPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('signin')
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(`/account/${user.uid}`)
      }
    })

    return () => unsubscribe()
  }, [router])

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

  const onSignIn = async (data: SignInFormValues) => {
    setIsLoading(true)
    try {
      await authSignIn({ email: data.email, password: data.password })
      router.push('/')
    } catch (error) {
      toast({
        title: '로그인 오류',
        description: '이메일 또는 비밀번호가 올바르지 않습니다.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSignUp = async (data: SignUpFormValues) => {
    setIsLoading(true)
    try {
      await authSignUp({ email: data.email, password: data.password })
    } catch (error: any) {
      if (error.message.includes('auth/email-already-in-use')) {
        toast({
          title: '회원가입 오류',
          description: '이미 등록된 이메일 주소입니다.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: '회원가입 오류',
          description: '회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">로그인</TabsTrigger>
          <TabsTrigger value="signup">회원가입</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>로그인</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmitSignIn(onSignIn)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="signInEmail">이메일</Label>
                  <Input
                    {...registerSignIn('email')}
                    id="signInEmail"
                    placeholder="example@example.com"
                    aria-invalid={errorSignIn.email ? 'true' : 'false'}
                  />
                  {errorSignIn.email && (
                    <p className="text-sm text-red-500" role="alert">
                      {errorSignIn.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signInPassword">비밀번호</Label>
                  <Input
                    {...registerSignIn('password')}
                    id="signInPassword"
                    type="password"
                    placeholder="********"
                    aria-invalid={errorSignIn.password ? 'true' : 'false'}
                  />
                  {errorSignIn.password && (
                    <p className="text-sm text-red-500" role="alert">
                      {errorSignIn.password.message}
                    </p>
                  )}
                </div>
                <Button type="button" variant="link" className="p-0 text-sm">
                  비밀번호를 잊으셨나요?
                </Button>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>회원가입</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmitSignUp(onSignUp)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="signUpEmail">이메일</Label>
                  <Input
                    {...registerSignUp('email')}
                    id="signUpEmail"
                    type="email"
                    placeholder="example@example.com"
                    aria-invalid={errorSignUp.email ? 'true' : 'false'}
                  />
                  {errorSignUp.email && (
                    <p className="text-sm text-red-500" role="alert">
                      {errorSignUp.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signUpPassword">비밀번호</Label>
                  <Input
                    {...registerSignUp('password')}
                    id="signUpPassword"
                    type="password"
                    placeholder="********"
                    aria-invalid={errorSignUp.password ? 'true' : 'false'}
                  />
                  {errorSignUp.password && (
                    <p className="text-sm text-red-500" role="alert">
                      {errorSignUp.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                    {...registerSignUp('confirmPassword')}
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    aria-invalid={
                      errorSignUp.confirmPassword ? 'true' : 'false'
                    }
                  />
                  {errorSignUp.confirmPassword && (
                    <p className="text-sm text-red-500" role="alert">
                      {errorSignUp.confirmPassword.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? '가입 중...' : '회원가입'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AccountPage
