import { DotsHorizontal } from './icons/Icon'

export default function UserBox() {
  return (
    <div className='hidden xs:flex items-center justify-center hoverAnimation p-3'>
      <img
        src='https://pbs.twimg.com/profile_images/1446165567187132420/8XVo47k1_400x400.jpg'
        alt='Profile image'
        className='w-10 h-10 rounded-full xl:mr-3 '
      />
      <div className='hidden xl:inline leading-5 '>
        <h4 className='font-bold'>funda</h4>
        <p className='text-gray-dark'>@fundakartal</p>
      </div>
      <DotsHorizontal className='hidden w-5 h-5 xl:inline-flex ml-auto' />
    </div>
  )
}
