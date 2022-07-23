import { useSession } from 'next-auth/react'

export default function UserImg({ className }) {
  const { data: session } = useSession()
  return (
    <img
      src={session.user.image}
      alt='Profile image'
      className={`rounded-full ${className}`}
    />
  )
}
