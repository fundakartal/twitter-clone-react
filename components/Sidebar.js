import { useState } from 'react'
import Image from 'next/image'
import logo from '../public/logo.svg'
import SidebarLink from 'SidebarLink'
import UserBox from 'UserBox'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  HomeIconActive,
  ExploreIcon,
  ExploreIconActive,
  CommunitiesIcon,
  CommunitiesIconActive,
  NotificationIcon,
  NotificationIconActive,
  MessagesIcon,
  MessagesIconActive,
  BookmarksIcon,
  BookmarksIconActive,
  ProfileIcon,
  ProfileIconActive,
  MoreIcon,
  CreateTweetIcon,
} from './icons/Icon'
import { useRecoilState } from 'recoil'
import { inputState } from '../atoms/modalAtom'

const sidebarLinks = [
  { name: 'Home', icon: HomeIcon, activeIcon: HomeIconActive },
  { name: 'Explore', icon: ExploreIcon, activeIcon: ExploreIconActive },
  {
    name: 'Communities',
    icon: CommunitiesIcon,
    activeIcon: CommunitiesIconActive,
  },
  {
    name: 'Notifications',
    icon: NotificationIcon,
    activeIcon: NotificationIconActive,
  },
  { name: 'Messages', icon: MessagesIcon, activeIcon: MessagesIconActive },
  { name: 'Bookmarks', icon: BookmarksIcon, activeIcon: BookmarksIconActive },
  { name: 'Profile', icon: ProfileIcon, activeIcon: ProfileIconActive },
  { name: 'More', icon: MoreIcon, activeIcon: MoreIcon },
]

function Sidebar({ postPage }) {
  const [active, setActive] = useState('Home')
  const [isInputOpen, setIsInputOpen] = useRecoilState(inputState)
  const router = useRouter()

  const handleMenuItemClick = (name) => {
    setActive(name)
    name === 'Home' && router.push('/')
  }
  return (
    <div className='fixed flex min-h-screen flex-col justify-between bg-black text-white-base xxs:sm:px-3 xxs:xl:w-[275px]'>
      <div className='flex flex-col items-center justify-center xl:items-start'>
        <div className='hoverAnimationBlue hidden h-14 w-14 items-center justify-center xxs:sm:flex '>
          <Image
            src={logo}
            width={38}
            height={38}
            onClick={() => router.push('/')}
          />
        </div>
        <nav>
          <ul className='fixed bottom-0 flex w-full max-w-[1265px] items-center justify-around bg-black xl:items-start xxs:sm:static xxs:sm:flex-col'>
            {sidebarLinks.slice(0, 5).map(({ name, icon, activeIcon }) => (
              <SidebarLink
                key={name}
                name={name}
                Icon={icon}
                ActiveIcon={activeIcon}
                active={active}
                onMenuItemClick={handleMenuItemClick}
              />
            ))}
          </ul>
          <ul className='hidden flex-col items-center xl:items-start xxs:sm:flex '>
            {sidebarLinks.slice(6).map(({ name, icon, activeIcon }) => (
              <SidebarLink
                key={name}
                name={name}
                Icon={icon}
                ActiveIcon={activeIcon}
                active={active}
                onMenuItemClick={handleMenuItemClick}
              />
            ))}
          </ul>
        </nav>
        <button
          className={`fixed bottom-20 right-5 flex items-center justify-center gap-4 rounded-full bg-blue-base p-3 text-lg font-bold shadow-lg drop-shadow-[0_0_3px_rgba(255,255,255,0.50)] transition-colors duration-300 ease-out hover:bg-blue-dark xl:px-8 xl:py-3 xxs:sm:static xxs:sm:filter-none xxs:xl:w-[85%] ${
            postPage && 'hidden sm:flex'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setIsInputOpen(true)
          }}
        >
          <CreateTweetIcon className='h-7 w-7 xxs:xl:hidden' />
          <span className='hidden xl:inline-flex'>Tweet</span>
        </button>
      </div>
      <div className='pb-3'>
        <UserBox />
      </div>
    </div>
  )
}

export default Sidebar
