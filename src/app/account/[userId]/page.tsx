'use client'

import React, { useEffect, useState } from 'react'

import { User, onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { auth, authSignOut } from '@/firebase'

const UserPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push('/account')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = () => {
    authSignOut()
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      {user.displayName && <p>Name: {user.displayName}</p>}
      {user.photoURL && (
        <Image src={user.photoURL} alt="Profile" width={20} height={20} />
      )}
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}

export default UserPage
