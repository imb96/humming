'use client'

import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { userAtom } from '@/stores/userAtom'

interface ProfileProps {
  profileImage?: string
}

const Profile = ({ profileImage }: ProfileProps) => {
  const router = useRouter()
  const user = useAtom(userAtom)

  const handleProfileClick = () => {
    if (user[0]?.user.uid === undefined) {
      router.push('/signin')
    } else {
      router.push(`/user/${user[0]?.user.uid}`)
    }
  }

  return (
    <div onClick={handleProfileClick} className="cursor-pointer">
      {profileImage ? (
        <Image src={profileImage} alt="album image" width={32} height={32} />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
        </svg>
      )}
    </div>
  )
}

export default Profile
