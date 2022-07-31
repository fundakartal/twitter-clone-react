import { getProviders, useSession } from 'next-auth/react'

export default function UserImg({ className, providers }) {
  const { data: session } = useSession()

  if (!session) return <Login providers={providers} />

  return (
    <img
      src={session?.user.image}
      alt={session?.user.name}
      className={`rounded-full ${className}`}
    />
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
