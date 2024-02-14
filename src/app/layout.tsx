import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Search from '@/components/Search'

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
        <main className="flex min-h-screen flex-col items-center pt-12 gap-5">
          <Search />
          <div className="flex justify-start">{children}</div>
        </main>
      </body>
    </html>
  )
}
