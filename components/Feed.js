import UserImg from './UserImg'
import { LatestTweetsIcon } from './icons/Icon'

export default function Feed() {
  return (
    <div className='text-white-base flex-grow border-l border-r border-gray-dark max-w-[600px] xxs:sm:ml-[88px] xxs:xl:ml-[275px]'>
      <div className='px-4 py-3 text-white-base flex items-center sticky top-0 z-50 bg-black border-b border-gray-dark'>
        <UserImg className='w-8 h-8 rounded-full mr-5 xxs:sm:hidden' />
        <span className='font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap'>Latest Tweets</span>
        <LatestTweetsIcon className='h-5 w-5 ml-auto' />
      </div>
    </div>
  )
}