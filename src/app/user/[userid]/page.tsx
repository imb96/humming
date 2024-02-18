export default function Page({ params }: { params: { userid: string } }) {
  return <div>User: {params.userid}</div>
}
