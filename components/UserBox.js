import { DotsHorizontal } from 'icons/Icon'
import UserImg from 'UserImg'
import { signOut, useSession } from 'next-auth/react'

export default function UserBox() {
  const {data: session} = useSession()
  return (
    <div className='hoverAnimation hidden items-center justify-center p-3 xxs:sm:flex' onClick={signOut}>
      <UserImg
        className='h-10 w-10 xl:mr-3'
      />
      <div className='hidden leading-5 xl:inline '>
        <h4 className='font-bold'>{session.user.name.split(' ')[0]}</h4>
        <p className='text-gray-light'>@{session.user.tag}</p>
      </div>
      <DotsHorizontal className='ml-auto hidden h-5 w-5 xl:inline-flex' />
    </div>
  )
}
