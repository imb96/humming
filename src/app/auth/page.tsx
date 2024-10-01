'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const SignIn = () => {
  const supabaseClient = useSupabaseClient()

  return (
    <div className="flex h-full items-center justify-center">
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          style: { container: { width: '300px' } },
        }}
        providers={['kakao']}
        localization={{}}
      />
    </div>
  )
}

export default SignIn
