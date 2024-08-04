import Link from 'next/link'

import Logo from '@/components/Logo'
import { Menubar } from '@/components/ui/menubar'

import { Button } from './ui/button'

export function Menu() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <Logo />
      <Link href={'/account'}>
        <Button size={'sm'} variant={'ghost'}>
          Account
        </Button>
      </Link>
    </Menubar>
  )
}
