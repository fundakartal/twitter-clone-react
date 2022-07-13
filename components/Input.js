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
const ReactGiphySearchbox = dynamic(() => import('react-giphy-searchbox'), {
  ssr: false,
})

export default function Input() {
  const [input, setInput] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [showGifs, setShowGifs] = useState(false)
  const filePickerRef = useRef(null)
  const addImageToPost = () => {}
  const sendPost = () => {}

  return (
    <div className='hidden space-x-3 overflow-y-scroll border-b border-gray-dark px-4 py-3 xxs:sm:flex'>
      <UserImg className='h-12 w-12 cursor-pointer transition-opacity ease-in-out hover:opacity-90' />
      <div className='w-full focus-within:divide-y focus-within:divide-gray-dark'>
        <div className={`${selectedImage && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows='2'
            className='min-h-[50px] w-full bg-transparent text-xl tracking-wide text-white-base placeholder-gray-light outline-none'
          />
          {selectedImage && (
            <div className='relative'>
              <div
                onClick={() => {
                  setSelectedImage(null)
                  setShowGifs(false)
                }}
                className='absolute top-1 left-1  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]'
              >
                <XIcon className='h-5 w-5' />
              </div>
              <img
                src={selectedImage}
                alt=''
                className='max-h-80 rounded-2xl object-contain'
              />
            </div>
          )}
        </div>
        <div className='flex items-center justify-between pt-2.5 text-blue-base'>
          <div className='flex items-center'>
            <button
              className='icon'
              disabled={selectedImage}
              onClick={() => filePickerRef.current.click()}
            >
              <ImageIcon className='h-5 w-5' />
              <input
                hidden
                type='file'
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </button>
            <button
              className='icon'
              disabled={selectedImage}
              onClick={() => {
                setShowGifs(!showGifs)
                setShowEmojis(false)
              }}
            >
              <GIFIcon className='h-5 w-5' />
            </button>
            <button className='icon' disabled={selectedImage}>
              <PollIcon className='h-5 w-5' />
            </button>
            <button
              className='icon'
              onClick={() => {
                setShowEmojis(!showEmojis)
                setShowGifs(false)
              }}
            >
              <EmojiIcon className='h-5 w-5' />
            </button>
            <button className='icon'>
              <ScheduleIcon className='h-5 w-5' />
            </button>
            <button className='icon' disabled>
              <LocationIcon className='h-5 w-5' />
            </button>
            {showEmojis && (
              <Picker
                onEmojiClick={(e, emojiObject) => {
                  setInput(input + emojiObject.emoji)
                }}
                searchPlaceholder='Search emojis'
              />
            )}
            {showGifs && (
              <div className='absolute mt-[410px] lg:mt-[610px]'>
                <ReactGiphySearchbox
                  apiKey={process.env.NEXT_PUBLIC_API_KEY}
                  masonryConfig={[
                    { columns: 2, imageWidth: 110, gutter: 5 },
                    { mq: '700px', columns: 3, imageWidth: 150, gutter: 5 },
                  ]}
                  onSelect={(item) =>
                    setSelectedImage(item.images.original.url)
                  }
                  poweredByGiphy={false}
                  searchPlaceholder='&#x1F50E; Search for GIFs'
                  listWrapperClassName='lg:!h-[500px]'
                  wrapperClassName='!rounded-2xl !overflow-hidden'
                />
              </div>
            )}
          </div>
          <button
            disabled={!input.trim() && !selectedImage}
            className='tweetBtn'
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}
