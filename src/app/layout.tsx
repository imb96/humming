import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import MusicPage from '@/components/music-page'
import { AuthContextProvider } from '@/context/AuthContext'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Humming',
  description: "find the song you're humming.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <main className="flex min-h-screen flex-col items-center gap-5">
            <MusicPage>{children}</MusicPage>
          </main>
        </AuthContextProvider>
      </body>
    </html>
  )
}
