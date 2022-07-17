import logo from '../public/logo.svg'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Login({ providers }) {
  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
      <Image src={logo} width={200} height={200} />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className='group relative inline-flex items-center justify-start overflow-hidden rounded-xl bg-white-base px-6 py-3 font-medium transition-all'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            <span className='absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-blue-base transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
            <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white-base'>
              Sign in with {provider.name}
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}
