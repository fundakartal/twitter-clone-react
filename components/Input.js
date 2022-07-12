import {
  EmojiIcon,
  GIFIcon,
  ImageIcon,
  LocationIcon,
  PollIcon,
  ScheduleIcon,
  XIcon,
} from 'icons/Icon'
import { useRef, useState } from 'react'
import UserImg from 'UserImg'
import dynamic from 'next/dynamic'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

export default function Input() {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = useRef(null)

  const addImageToPost = () => {}

  const onEmojiClick = (event, emojiObject) => {

    setInput(input + emojiObject.emoji);
  }

  return (
    <div className='hidden space-x-3 overflow-y-scroll border-b border-gray-dark px-4 py-3 xxs:sm:flex'>
      <UserImg className='h-12 w-12 cursor-pointer transition-opacity ease-in-out hover:opacity-90' />
      <div className='w-full focus-within:divide-y focus-within:divide-gray-dark'>
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows='2'
            className='peer min-h-[50px] w-full bg-transparent text-xl tracking-wide text-white-base placeholder-gray-light outline-none'
          />
          {selectedFile && (
            <div className='relative'>
              <div
                onClick={() => setSelectedFile(null)}
                className='absolute top-1 left-1  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]'
              >
                <XIcon className='h-5 w-5' />
              </div>
              <img
                src={selectedFile}
                alt=''
                className='max-h-80 rounded-2xl object-contain'
              />
            </div>
          )}
        </div>
        <div className='flex items-center justify-between pt-2.5 text-blue-base'>
          <div className='flex items-center'>
            <div className='icon' onClick={() => filePickerRef.current.click()}>
              <ImageIcon className='h-5 w-5' />
              <input
                hidden
                type='file'
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className='icon'>
              <GIFIcon className='h-5 w-5' />
            </div>
            <div className='icon'>
              <PollIcon className='h-5 w-5' />
            </div>
            <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiIcon className='h-5 w-5' />
            </div>
            <div className='icon'>
              <ScheduleIcon className='h-5 w-5' />
            </div>
            <div className='icon'>
              <ScheduleIcon className='h-5 w-5' />
            </div>
            <div className='icon'>
              <LocationIcon className='h-5 w-5' />
            </div>
            {showEmojis && (
              <Picker
                onEmojiClick={onEmojiClick}
                searchPlaceholder='Search emojis'
                pickerStyle={{
                  position: 'absolute',
                  marginTop: '465px',
                  marginLeft: -40,
                  maxWidth: '320px',
                  borderRadius: '20px',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
