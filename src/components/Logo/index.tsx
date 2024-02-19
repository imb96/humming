'use client'

import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div
      onClick={handleLogoClick}
      className="cursor-pointer text-orange-600 text-lg font-black"
    >
      Humming
    </div>
  )
}

export default Logo
