'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

const AuthContent = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const user = useUser()

  const handleAuth = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error(error)
      }
    }
    if (!user) {
      router.push('/auth')
    }
  }
  return (
    <div>
      <Button onClick={handleAuth} size={'sm'}>
        {user ? 'logout' : 'login'}
      </Button>
    </div>
  )
}

export default AuthContent
