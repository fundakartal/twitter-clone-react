import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders, useSession } from 'next-auth/react'
import Login from 'Login'

export default function Home({ providers }) {
  const { data: session } = useSession()
  if (!session) return <Login providers={providers} />

  return (
    <>
      <Sidebar />
      <Feed />
      {/* widgets */}
      {/* Modal */}
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
