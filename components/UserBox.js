import { DotsHorizontal } from 'icons/Icon'
import UserImg from 'UserImg'

export default function UserBox() {
  return (
    <div className='hoverAnimation hidden items-center justify-center p-3 xxs:sm:flex'>
      <UserImg className='h-10 w-10 xl:mr-3' />
      <div className='hidden leading-5 xl:inline '>
        <h4 className='font-bold'>funda</h4>
        <p className='text-gray-light'>@fundakartal</p>
      </div>
      <DotsHorizontal className='ml-auto hidden h-5 w-5 xl:inline-flex' />
    </div>
  )
}
