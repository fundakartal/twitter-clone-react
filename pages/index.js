import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { useSession } from 'next-auth/react'
import Login from 'Login'

export default function Home() {
  const { data: session } = useSession()
  if (!session) return <Login />

  return (
    <>
      <Sidebar />
      <Feed />
      {/* widgets */}
      {/* Modal */}
    </>
  )
}