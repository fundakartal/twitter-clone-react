import { SearchIcon, XIcon } from 'icons/Icon'
import { useRef, useState } from 'react'

export default function Widgets({ trendingResults, followResults }) {
  const [value, setValue] = useState('')
  const searchInput = useRef()
  const searchModal = useRef()
  const clearIcon = useRef()
  const clearInput = () => {
    searchInput.current.value = ''
    clearIcon.current.classList.add('hidden')
  }
  const handleInput = () => {
    setValue(searchInput.current.value)
    searchInput.current.value === ''
      ? clearIcon.current.classList.add('hidden')
      : clearIcon.current.classList.remove('hidden')
  }

  return (
    <aside className='ml-8 hidden space-y-5 py-1 lg:inline lg:w-[290px] xl:w-[350px]'>
      <div className='sticky top-0 z-50 bg-black py-1.5'>
        <div className='relative flex items-center rounded-full bg-gray-base p-3'>
          <SearchIcon className='z-50 h-5 text-gray-light' />
          <input
            onFocus={searchModal.current.classList.remove('hidden')}
            onBlur={searchModal.current.classList.add('hidden')}
            onChange={handleInput}
            type='text'
            value={value}
            ref={searchInput}
            placeholder='Search Twitter'
            className='absolute inset-0 w-full rounded-full border border-transparent bg-transparent pl-11 text-white-base placeholder-gray-light outline-none focus:border-blue-base focus:bg-black focus:shadow-lg'
          />
          <button
            className='z-10 ml-auto hidden h-[22px] w-[22px] cursor-pointer rounded-full bg-blue-base text-white-base'
            ref={clearIcon}
            onClick={clearInput}
          >
            <XIcon className='h-full w-full p-0.5 text-gray-dark' />
          </button>
        </div>
        <div
          ref={searchModal}
          className='search-shadow z-10 mx-auto hidden min-h-[100px] rounded-lg text-center text-gray-light lg:w-[290px] xl:w-[350px]'
        >
          {value !== '' ? (
            <div className='flex h-20 w-full cursor-pointer items-center px-6 text-white-base hover:bg-[#16181C]'>
              <div className='flex h-14 w-14 items-center'>
                <SearchIcon className='h-7' />
              </div>
              <span>{value}</span>
            </div>
          ) : (
            <p className='px-5 pt-5'>
              Try searching for people, topics, or keywords.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
