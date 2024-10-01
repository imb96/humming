import React from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import MusicPage from '@/components/music-page'
import { Toaster } from '@/components/ui/toaster'
import SupabaseProvider from '@/context/SupabaseProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Humming',
  description: "find the song you're humming.",
  icons: {
    icon: '/hummingbird.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <main className="flex min-h-screen flex-col items-center gap-5">
            <MusicPage>{children}</MusicPage>
          </main>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  )
}
