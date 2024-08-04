import { ReactNode } from 'react'

import { Menu } from '@/components/menu'
import { Sidebar } from '@/components/sidebar'
import { playlists } from '@/data/playlists'

export default function MusicPage({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <Menu />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar playlists={playlists} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
