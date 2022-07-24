import { useSession } from 'next-auth/react'

export default function UserImg({ className }) {
  const { data: session } = useSession()
  return (
    <img
      src={session.user.image}
      alt={session.user.name}
      className={`rounded-full ${className}`}
    />
  )
}
