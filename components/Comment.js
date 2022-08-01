import {
  DotsHorizontal,
  LikeIcon,
  LikeIconFilled,
  ReTweetIcon,
  ShareIcon,
  TrashIcon,
} from 'icons/Icon'
import Moment from 'react-moment'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase'

export default function Comment({ id, comment, postId, post }) {
  const { data: session } = useSession()
  const [reTweets, setReTweets] = useState([])
  const [reTweeted, setReTweeted] = useState(false)
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        collection(db, 'posts', postId, 'comments', id, 'likes'),
        (snapshot) => setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(
        collection(db, 'posts', postId, 'comments', id, 'reTweets'),
        (snapshot) => setReTweets(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  useEffect(
    () =>
      setReTweeted(
        reTweets.findIndex((reTweet) => reTweet.id === session?.user?.uid) !==
          -1
      ),
    [reTweets]
  )

  const likeComment = async () => {
    if (liked) {
      await deleteDoc(
        doc(db, 'posts', postId, 'comments', id, 'likes', session.user.uid)
      )
    } else {
      await setDoc(
        doc(db, 'posts', postId, 'comments', id, 'likes', session.user.uid),
        {
          username: session.user.name,
        }
      )
    }
  }

  const reTweetComment = async () => {
    if (reTweeted) {
      await deleteDoc(
        doc(db, 'posts', postId, 'comments', id, 'reTweets', session.user.uid)
      )
    } else {
      await setDoc(
        doc(db, 'posts', postId, 'comments', id, 'reTweets', session.user.uid),
        {
          username: session.user.name,
        }
      )
    }
  }

  const deleteComment = async () => {
    await deleteDoc(doc(db, 'posts', postId, 'comments', id))
  }

  return (
    <div className='cursor-pointer border-b border-t border-gray-dark px-4 pt-3 transition duration-200 ease-in-out hover:bg-[#080808]'>
      {reTweeted && (
        <div className='mb-1 flex items-center text-gray-light'>
          <div className='w-12'>
            <ReTweetIcon className='ml-auto h-4 w-4' />
          </div>
          <span className='ml-3 text-[13px] font-bold hover:underline'>
            You Retweeted
          </span>
        </div>
      )}
      <div className='flex'>
        <img
          src={comment?.userImg}
          alt={comment?.username}
          className='mr-4 h-12 w-12 rounded-full transition-opacity duration-200 ease-in-out hover:opacity-90'
        />

        <div className='flex w-full flex-col'>
          <div className='flex justify-between'>
            <div className='flex w-full justify-between'>
              <div className='flex text-gray-light'>
                <div className='flex shrink items-baseline truncate'>
                  <h4
                    className={`shrink truncate text-[15px] font-bold leading-5 text-white-base hover:underline`}
                  >
                    {comment?.username.split(' ')[0]}
                  </h4>
                  <span className='ml-1.5 truncate'>@{comment?.tag}</span>
                </div>
                <div className='shrink-0'>
                  <span className='mx-1'>·</span>
                  <span className='hover:underline '>
                    <Moment fromNow ago>
                      {comment?.timestamp?.toDate()}
                    </Moment>
                  </span>
                </div>
              </div>
              <div className='icon group'>
                <DotsHorizontal className='h-5 w-5 text-gray-light transition duration-200 ease-out group-hover:text-blue-base' />
              </div>
            </div>
          </div>

          <p className='-mt-3 text-[15px] text-gray-light '>
            Replying to <span className='text-blue-base'>@{post?.tag}</span>
          </p>

          <p className='pb-3 text-[15px] text-white-base '>
            {comment?.comment}
          </p>

          <img
            src={comment?.image}
            alt=''
            className='mr-2 max-h-[700px] rounded-2xl object-cover'
          />

          <div className={`flex -ml-2 w-10/12 justify-between py-2 text-gray-light ${!comment?.image && '-mt-4'}`}>
            {session.user.uid === comment?.id ? (
              <div
                className='group flex items-center space-x-1'
                onClick={(e) => {
                  e.stopPropagation()
                  deleteComment()
                }}
              >
                <div className='icon group-hover:bg-red-600/10'>
                  <TrashIcon className='h-5 group-hover:text-red-600' />
                </div>
              </div>
            ) : (
              <div
                className='group flex items-center space-x-1'
                onClick={(e) => {
                  e.stopPropagation()
                  reTweetComment()
                }}
              >
                <div className='icon group-hover:bg-green-500/10'>
                  <ReTweetIcon
                    className={`h-5 group-hover:text-green-500 ${
                      reTweeted && 'text-green-500'
                    }`}
                  />
                </div>
                {reTweets.length > 0 && (
                  <span
                    className={`text-sm group-hover:text-green-500 ${
                      reTweeted && 'text-green-500'
                    }`}
                  >
                    {reTweets.length}
                  </span>
                )}
              </div>
            )}
            <div
              className='group flex items-center space-x-1'
              onClick={(e) => {
                e.stopPropagation()
                likeComment()
              }}
            >
              <div className='icon group-hover:bg-pink-600/10'>
                {liked ? (
                  <LikeIconFilled className='h-5 text-pink-600' />
                ) : (
                  <LikeIcon className='h-5 group-hover:text-pink-600' />
                )}
              </div>
              {likes.length > 0 && (
                <span
                  className={`text-sm group-hover:text-pink-600 ${
                    liked && 'text-pink-600'
                  }`}
                >
                  {likes.length}
                </span>
              )}
            </div>
            <div className='icon group'>
              <ShareIcon className='h-5 group-hover:text-blue-base' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
