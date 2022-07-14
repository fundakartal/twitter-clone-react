import UserImg from 'UserImg'
import { LatestTweetsIcon } from 'icons/Icon'
import Input from 'Input'

export default function Feed() {
  return (
    <div className='max-w-[600px] flex-grow border-l border-r border-gray-dark text-white-base xxs:sm:ml-[88px] xxs:xl:ml-[275px]'>
      <div className='sticky top-0 z-50 flex cursor-pointer items-center bg-black px-4 py-3 text-white-base'>
        <UserImg
          src='https://pbs.twimg.com/profile_images/1446165567187132420/8XVo47k1_400x400.jpg'
          className='mr-5 h-8 w-8 xxs:sm:hidden'
        />
        <h2 className='overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold sm:text-xl'>
          Latest Tweets
        </h2>
        <div className='hoverAnimation ml-auto flex h-9 w-9 items-center justify-center'>
          <LatestTweetsIcon className='h-5 w-5' />
        </div>
      </div>

      <Input />
    </div>
  )
}
