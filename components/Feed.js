import UserImg from './UserImg'
import { LatestTweetsIcon } from './icons/Icon'
import Input from './Input'

export default function Feed() {
  return (
    <div className='text-white-base flex-grow border-l border-r border-gray-dark max-w-[600px] xxs:sm:ml-[88px] xxs:xl:ml-[275px]'>
      <div className='cursor-pointer px-4 py-3 text-white-base flex items-center sticky top-0 z-50 bg-black border-b border-gray-dark'>
        <UserImg className='w-8 h-8 mr-5 xxs:sm:hidden' />
        <h2 className='font-bold text-lg sm:text-xl overflow-hidden text-ellipsis whitespace-nowrap'>
          Latest Tweets
        </h2>
        <div className='w-9 h-9 flex items-center justify-center hoverAnimation ml-auto'>
          <LatestTweetsIcon className='h-5 w-5' />
        </div>
      </div>

      <Input />
    </div>
  )
}
