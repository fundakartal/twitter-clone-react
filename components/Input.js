import {
  EmojiIcon,
  GIFIcon,
  ImageIcon,
  LocationIcon,
  PollIcon,
  ScheduleIcon,
  XIcon,
} from 'icons/Icon'
import { useEffect, useRef, useState } from 'react'
import UserImg from 'UserImg'
import dynamic from 'next/dynamic'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })
const ReactGiphySearchbox = dynamic(() => import('react-giphy-searchbox'), {
  ssr: false,
})

export default function Input() {
  const [input, setInput] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [showGifs, setShowGifs] = useState(false)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)

  const sendPost = async () => {
    if (loading) return
    setLoading(true)
    const docRef = await addDoc(collection(db, 'posts'), {
      // id: session.user.uid,
      // username: session.user.name,
      // userImg: session.user.image,
      // tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })

    if (selectedImage) {
      if (!selectedImage.includes('giphy')) {
        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        await uploadString(imageRef, selectedImage, 'data_url').then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', docRef.id), {
              image: downloadURL,
            })
          }
        )
      }

      if (selectedImage.includes('giphy')) {
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: selectedImage,
        })
      }
    }

    setLoading(false)
    setInput('')
    setSelectedImage(null)
    setShowEmojis(false)
    setShowGifs(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result)
    }
  }

  useEffect(() => {
    selectedImage && setShowGifs(false)
  }, [selectedImage])

  return (
    <div
      className={`hidden space-x-3 overflow-y-scroll border-b border-gray-dark px-4 py-3 scrollbar-hide xxs:sm:flex ${
        loading && 'opacity-60'
      }`}
    >
      <UserImg
        src='https://pbs.twimg.com/profile_images/1446165567187132420/8XVo47k1_400x400.jpg'
        className='h-12 w-12 cursor-pointer transition-opacity ease-in-out hover:opacity-90'
      />
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
        {!loading && (
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
                    onSelect={(item) => {
                      setSelectedImage(item.images.original.url)
                    }}
                    poweredByGiphy={false}
                    searchPlaceholder='&#x1F50E; Search for GIFs'
                    listWrapperClassName='lg:!h-[500px] !scrollbar-hide'
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
        )}
      </div>
    </div>
  )
}
