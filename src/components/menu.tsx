import Logo from '@/components/Logo'
import { Menubar } from '@/components/ui/menubar'

import AuthContent from './Auth'

export function Menu() {
  return (
    <Menubar className="flex items-center justify-between rounded-none border-b border-none px-2 py-8 lg:px-4">
      <Logo />
      <AuthContent />
    </Menubar>
  )
}
