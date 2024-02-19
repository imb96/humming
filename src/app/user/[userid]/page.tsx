'use client'

import SignOut from '@/components/User/SignOut'
import { useAuthContext } from '@/context/AuthContext'

export default function Page({ params }: { params: { userid: string } }) {
  const { user } = useAuthContext() as any

  return (
    <div>
      {user?.email}
      <SignOut />
    </div>
  )
}
