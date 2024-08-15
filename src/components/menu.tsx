'use client'

import { useEffect, useState } from 'react'

import { User, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'

import Logo from '@/components/Logo'
import { Menubar } from '@/components/ui/menubar'
import { auth } from '@/firebase'

import { Button } from './ui/button'

export function Menu() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <Logo />
      <Link href={`${user ? '/account/' + user.uid : '/account'}`}>
        <Button size={'sm'} variant={'ghost'}>
          {user ? user.email : 'Account'}
        </Button>
      </Link>
    </Menubar>
  )
}
