import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
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
            <Header />
            <div className="flex justify-start">{children}</div>
          </main>
        </AuthContextProvider>
      </body>
    </html>
  )
}
