'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div
      onClick={handleLogoClick}
      className="flex cursor-pointer items-center justify-center text-lg font-black"
    >
      <div>
        <Image src="/hummingbird.png" alt="logo" width={24} height={24} />
      </div>
      <div>Humming</div>
    </div>
  )
}

export default Logo
