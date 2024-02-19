'use client'

import { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { app } from '@/firebase'

const auth = getAuth(app)

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user as any)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
