import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <div className='mx-auto flex items-center justify-center'>
      <button
        className='rounded-full bg-blue-base px-10 py-2 text-lg font-bold text-white-base'
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  )
}
