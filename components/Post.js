import { deleteDoc, doc } from 'firebase/firestore'
import {
  DotsHorizontal,
  LikeIcon,
  LikeIconFilled,
  ReplyIcon,
  ReTweetIcon,
  ShareIcon,
  TrashIcon,
} from 'icons/Icon'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Moment from 'react-moment'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atoms/modalAtom'
import { db } from '../firebase'

export default function Post({ id, post, postPage }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [comments, setComments] = useState([])
  const [reTweets, setReTweets] = useState([])
  const [reTweeted, setReTweeted] = useState(false)
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)

  return (
    <div className='flex cursor-pointer border-b border-gray-dark px-4 py-3'>
      {!postPage && post && (
        <img
          src={post?.userImg}
          alt={post?.username}
          className='mr-4 h-12 w-12 rounded-full transition-opacity duration-200 ease-in-out hover:opacity-90'
        />
      )}
      <div className='flex w-full flex-col space-y-2'>
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && post && (
            <img
              src={post?.userImg}
              alt={post?.username}
              className='mr-4 h-12 w-12 rounded-full transition-opacity duration-200 ease-in-out hover:opacity-90'
            />
          )}
          <div className='text-gray-light'>
            <div className='inline-block'>
              <h4
                className={`tetx-[15px] font-bold leading-5 text-white-base hover:underline sm:text-base ${
                  !postPage && 'inline-block'
                }`}
              >
                {post?.username}
              </h4>
              <span className={`${!postPage && 'ml-1.5'}`}>@{post?.tag}</span>
            </div>{' '}
            ·{' '}
            <span className='hover:underline'>
              <Moment fromNow ago>
                {post?.timestamp?.toDate()}
              </Moment>
            </span>
            {!postPage && (
              <p className='mt-0.5 text-[15px] text-white-base'>{post?.text}</p>
            )}
          </div>
          <div className='icon group ml-auto flex-shrink-0'>
            <DotsHorizontal className='h-5 w-5 text-gray-light transition duration-200 ease-out group-hover:text-blue-base' />
          </div>
        </div>
        {postPage && (
          <p className='mt-0.5 text-[15px] text-white-base'>{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=''
          className='mr-2 max-h-[700px] rounded-2xl object-cover'
        />
        <div
          className={`flex w-10/12 justify-between text-gray-light ${
            postPage && 'mx-auto'
          }`}
        >
          <div
            className='group flex items-center space-x-1'
            onClick={(e) => {
              e.stopPropagation()
              setPostId(id)
              setIsOpen(true)
            }}
          >
            <div className='icon'>
              <ReplyIcon className='h-5 group-hover:text-blue-base' />
            </div>
            {comments.length > 0 && (
              <span className='text-sm group-hover:text-blue-base'>
                {comments.length}
              </span>
            )}
          </div>
          {session.user.uid === post?.id ? (
            <div
              className='group flex items-center space-x-1'
              onClick={(e) => {
                e.stopPropagation()
                deleteDoc(doc(db, 'posts', id))
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
                reTweetPost()
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
                <span className={`text-sm group-hover:text-green-500 ${reTweeted && 'text-green-500'}`}>
                  {reTweets.length}
                </span>
              )}
            </div>
          )}
          <div
            className='group flex items-center space-x-1'
            onClick={(e) => {
              e.stopPropagation()
              likePost()
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
  )
}
