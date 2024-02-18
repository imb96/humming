import SignOut from '@/components/User/SignOut'

export default function Page({ params }: { params: { userid: string } }) {
  return (
    <div>
      <SignOut />
    </div>
  )
}
