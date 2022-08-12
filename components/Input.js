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
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })
const ReactGiphySearchbox = dynamic(() => import('react-giphy-searchbox'), {
  ssr: false,
})
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { inputState, modalState, postIdState } from '../atoms/modalAtom'

export default function Input({ Modal, InputModal, postPage, post }) {
  const [input, setInput] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [showGifs, setShowGifs] = useState(false)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [isInputOpen, setIsInputOpen] = useRecoilState(inputState)
  const iconSetRef = useRef()
  const tweetBtnRef = useRef()
  const replyingToRef = useRef()
  const textAreaRef = useRef()

  useEffect(() => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }, [input, comment])

  const focusInput = () => {
    iconSetRef.current.classList.remove('hidden')
    iconSetRef.current.classList.add('flex')
    tweetBtnRef.current.classList.add('hidden')
    replyingToRef.current.classList.remove('hidden')
  }

  const sendComment = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
      id: session.user.uid,
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    if (selectedImage) {
      if (!selectedImage.includes('giphy')) {
        const imageRef = ref(
          storage,
          `posts/${postId}/comments/${docRef.id}/image`
        )
        await uploadString(imageRef, selectedImage, 'data_url').then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', postId, 'comments', docRef.id), {
              image: downloadURL,
            })
          }
        )
      } else {
        await updateDoc(doc(db, 'posts', postId, 'comments', docRef.id), {
          image: selectedImage,
        })
      }
    }
    setIsOpen(false)
    setSelectedImage(null)
    setShowEmojis(false)
    setShowGifs(false)
    setComment('')
    setLoading(false)
    router.push(`/${postId}`)
  }

  const sendPost = async () => {
    if (loading) return
    setLoading(true)
    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
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
      } else {
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: selectedImage,
        })
      }
    }
    setInput('')
    setSelectedImage(null)
    setShowEmojis(false)
    setShowGifs(false)
    setLoading(false)
    setIsInputOpen(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    if (
      e.target.files[0] &&
      e.target.files[0].type.includes('image') &&
      e.target.files[0].size < 5 * 1024 * 1024
    ) {
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
    } else {
      alert('Please select an image less than 5mb')
    }
  }

  useEffect(() => {
    selectedImage && setShowGifs(false)
  }, [selectedImage])

  return (
    <>
      <p
        className={`-my-2 ml-[60px] ${postPage && 'hidden'} ${
          !Modal && 'hidden'
        }  text-[15px] text-gray-light`}
        ref={replyingToRef}
      >
        Replying to <span className='text-blue-base'>@{post?.tag}</span>
      </p>
      <div
        className={`flex space-x-3 overflow-y-scroll py-3 scrollbar-hide ${
          !Modal &&
          !InputModal &&
          'hidden border-b border-gray-dark px-4 xxs:sm:flex'
        } ${loading && 'opacity-60'}`}
      >
        <UserImg className='h-12 w-12 cursor-pointer transition-opacity ease-in-out hover:opacity-90' />
        <div
          className={`w-full ${
            !postPage &&
            !Modal &&
            'focus-within:divide-y focus-within:divide-gray-dark'
          }`}
        >
          <div
            className={`${selectedImage && 'pb-7'} ${input && 'space-y-2.5'} ${
              postPage && 'flex flex-wrap items-center'
            }`}
          >
            {Modal ? (
              <textarea
                value={comment}
                ref={textAreaRef}
                rows={1}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Tweet your reply'
                onFocus={() => {
                  postPage && focusInput()
                }}
                className={`min-h-[50px] scrollbar-hide ${Modal && 'py-3'} ${
                  !postPage && 'w-full'
                } ${
                  postPage && 'h-12 flex-grow py-1.5 focus:h-20'
                } bg-transparent text-xl tracking-wide text-white-base placeholder-gray-light outline-none`}
              />
            ) : (
              <textarea
                value={input}
                ref={textAreaRef}
                rows={1}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's happening?"
                className='min-h-[50px] w-full bg-transparent text-xl tracking-wide text-white-base placeholder-gray-light outline-none scrollbar-hide'
              />
            )}
            
            {postPage && (
              <button
                disabled={!comment.trim() && !selectedImage}
                className='tweetBtn'
                onClick={sendComment}
                ref={tweetBtnRef}
              >
                Reply
              </button>
            )}
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
            <div
              className={`${!postPage && 'flex'} ${
                postPage && 'hidden'
              } w-full flex-wrap items-center justify-between gap-3 pt-2.5 text-blue-base`}
              ref={iconSetRef}
            >
              <div className='-ml-2 flex flex-wrap items-center'>
                <button
                  className='icon'
                  disabled={selectedImage}
                  onClick={() => filePickerRef.current.click()}
                >
                  <ImageIcon className='h-5 w-5' />
                  <input
                    hidden
                    type='file'
                    accept='image/*'
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
                  <div
                    className={`absolute mt-[382px] ${
                      Modal && selectedImage && '-mt-[75%]'
                    }`}
                  >
                    <Picker
                      onEmojiClick={(e, emojiObject) => {
                        setInput(input + emojiObject.emoji)
                        setComment(comment + emojiObject.emoji)
                      }}
                      searchPlaceholder='Search emojis'
                    />
                  </div>
                )}
                {showGifs && (
                  <div
                    className={`absolute ${
                      !Modal && 'mt-[410px] lg:mt-[610px]'
                    }`}
                  >
                    <ReactGiphySearchbox
                      apiKey={process.env.NEXT_PUBLIC_GIPHY_API_KEY}
                      masonryConfig={[
                        { columns: 2, imageWidth: 110, gutter: 5 },
                        {
                          mq: '700px',
                          columns: 3,
                          imageWidth: 150,
                          gutter: 5,
                        },
                      ]}
                      onSelect={(item) => {
                        setSelectedImage(item.images.original.url)
                      }}
                      poweredByGiphy={false}
                      searchPlaceholder='&#x1F50E; Search for GIFs'
                      listWrapperClassName='lg:!h-[500px] !scrollbar-hide'
                      wrapperClassName='!rounded-2xl !overflow-hidden !bg-black'
                    />
                  </div>
                )}
              </div>
              <div className='flex items-center gap-5'>
                {Modal ? (
                  <div
                    className={`${
                      comment.length ? 'inline' : 'hidden'
                    } relative h-[30px] w-[30px] rounded-full`}
                  >
                    <svg
                      className={`relative h-full w-full ${
                        comment.length >= 290 && 'hidden'
                      }`}
                    >
                      <circle
                        className={`${
                          comment.length >= 280 && 'stroke-red-base'
                        } h-full w-full fill-transparent stroke-gray-light stroke-[6%]`}
                        cx='50%'
                        cy='50%'
                        r='46%'
                        strokeLinecap='round'
                      ></circle>
                      <circle
                        className={`h-full w-full fill-transparent stroke-[6%] ${
                          comment.length <= 259
                            ? 'stroke-blue-base'
                            : comment.length >= 259 && comment.length < 280
                            ? 'stroke-yellow-500'
                            : 'stroke-red-base'
                        }`}
                        cx='50%'
                        cy='50%'
                        r='46%'
                        strokeLinecap='round'
                        strokeDasharray='calc(30 * 0.46 * 2 * 3.1416)'
                        strokeDashoffset={`calc(30 * 0.46 * 2 * 3.1416 - (30 * 0.46 * 2 * 3.1416 * ${
                          comment.length * (100 / 280)
                        }) / 100)`}
                      ></circle>
                    </svg>
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        comment.length <= 259 ? 'hidden' : 'inline'
                      }`}
                    >
                      <h2
                        className={`text-sm font-bold text-gray-light ${
                          comment.length >= 280 && 'text-red-base'
                        }`}
                      >
                        {280 - comment.length}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${
                      input.length ? 'inline' : 'hidden'
                    } relative h-[30px] w-[30px] rounded-full`}
                  >
                    <svg
                      className={`relative h-full w-full ${
                        input.length >= 290 && 'hidden'
                      }`}
                    >
                      <circle
                        className={`${
                          input.length >= 280 && 'stroke-red-base'
                        } h-full w-full fill-transparent stroke-gray-light stroke-[6%]`}
                        cx='50%'
                        cy='50%'
                        r='46%'
                        strokeLinecap='round'
                      ></circle>
                      <circle
                        className={`h-full w-full fill-transparent stroke-[6%] ${
                          input.length <= 259
                            ? 'stroke-blue-base'
                            : input.length >= 259 && input.length < 280
                            ? 'stroke-yellow-500'
                            : 'stroke-red-base'
                        }`}
                        cx='50%'
                        cy='50%'
                        r='46%'
                        strokeLinecap='round'
                        strokeDasharray='calc(30 * 0.46 * 2 * 3.1416)'
                        strokeDashoffset={`calc(30 * 0.46 * 2 * 3.1416 - (30 * 0.46 * 2 * 3.1416 * ${
                          input.length * (100 / 280)
                        }) / 100)`}
                      ></circle>
                    </svg>
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        input.length <= 259 ? 'hidden' : 'inline'
                      }`}
                    >
                      <h2
                        className={`text-sm font-bold text-gray-light ${
                          input.length >= 280 && 'text-red-base'
                        }`}
                      >
                        {280 - input.length}
                      </h2>
                    </div>
                  </div>
                )}

                {Modal ? (
                  <button
                    disabled={
                      (!comment.trim() && !selectedImage) ||
                      comment.length > 280
                    }
                    className='tweetBtn'
                    onClick={sendComment}
                  >
                    Reply
                  </button>
                ) : (
                  <button
                    disabled={
                      (!input.trim() && !selectedImage) || input.length > 280
                    }
                    className='tweetBtn'
                    onClick={sendPost}
                  >
                    Tweet
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
