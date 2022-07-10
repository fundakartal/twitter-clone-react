import { DotsHorizontal } from './icons/Icon'
import UserImg from './UserImg'

export default function UserBox() {
  return (
    <div className='hidden xxs:sm:flex items-center justify-center hoverAnimation p-3'>
      <UserImg className='w-10 h-10 xl:mr-3' />
      <div className='hidden xl:inline leading-5 '>
        <h4 className='font-bold'>funda</h4>
        <p className='text-gray-light'>@fundakartal</p>
      </div>
      <DotsHorizontal className='hidden w-5 h-5 xl:inline-flex ml-auto' />
    </div>
  )
}
