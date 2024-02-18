import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'

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
        <main className="flex min-h-screen flex-col items-center gap-5">
          <Header />
          <div className="flex justify-start">{children}</div>
        </main>
      </body>
    </html>
  )
}
