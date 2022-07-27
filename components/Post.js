import {
  DotsHorizontal,
  LikeIcon,
  LikeIconFilled,
  ReplyIcon,
  ReTweetIcon,
  ShareIcon,
  TrashIcon,
} from 'icons/Icon'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import useActions from '../hooks/useActions'
import { useSession } from 'next-auth/react'

export default function Post({ id, post, postPage }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [
    likePost,
    reTweetPost,
    deletePost,
    reTweeted,
    liked,
    reTweets,
    likes,
    comments,
    setIsOpen,
    setPostId,
  ] = useActions(id)

  return (
    <div
      className='cursor-pointer border-b border-gray-dark px-4 py-3 transition duration-200 ease-in-out hover:bg-[#080808]'
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && reTweeted && (
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
        {!postPage && post && (
          <img
            src={post?.userImg}
            alt={post?.username}
            className='mr-4 h-12 w-12 rounded-full transition-opacity duration-200 ease-in-out hover:opacity-90'
          />
        )}
        <div className='flex w-full flex-col'>
          <div className='flex justify-between'>
            {postPage && post && (
              <img
                src={post?.userImg}
                alt={post?.username}
                className='mr-4 h-12 w-12 rounded-full transition-opacity duration-200 ease-in-out hover:opacity-90'
              />
            )}
            <div className='flex text-gray-light'>
              <div
                className={`flex shrink items-baseline truncate ${
                  postPage && 'flex-col'
                }`}
              >
                <h4
                  className={`shrink truncate text-[15px] font-bold leading-5 text-white-base hover:underline`}
                >
                  {post?.username}
                </h4>
                <span className={`truncate ${!postPage && 'ml-1.5'}`}>
                  @{post?.tag}
                </span>
              </div>
              {!postPage && (
                <div className='shrink-0'>
                  <span className='mx-1'>·</span>
                  <span className='hover:underline '>
                    <Moment fromNow ago>
                      {post?.timestamp?.toDate()}
                    </Moment>
                  </span>
                </div>
              )}
            </div>
            <div className='icon group shrink-0'>
              <DotsHorizontal className='h-5 w-5 text-gray-light transition duration-200 ease-out group-hover:text-blue-base' />
            </div>
          </div>

          <p className='pb-3 text-[15px] text-white-base'>{post?.text}</p>

          <img
            src={post?.image}
            alt=''
            className='mr-2 max-h-[700px] rounded-2xl object-cover'
          />
          {postPage && (
            <div className='divide-y divide-gray-dark border-b border-gray-dark text-gray-light hover:underline'>
              <div className='py-4'>
                <Moment format='HH:MM A z · MMMM DD, YYYY'>
                  {post?.timestamp?.toDate()}
                </Moment>
              </div>

              <div className='flex gap-x-5 py-4 text-[14px]'>
                {reTweets.length > 0 && (
                  <div className=''>
                    <span className='font-bold text-white-base'>
                      {reTweets.length}
                    </span>{' '}
                    Retweets
                  </div>
                )}
                {likes.length > 0 && (
                  <div className=''>
                    <span className='font-bold text-white-base'>
                      {likes.length}
                    </span>{' '}
                    Likes
                  </div>
                )}
              </div>
            </div>
          )}

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
                  deletePost()
                  router.push('/')
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
                  reTweetPost(post)
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
    </div>
  )
}
