import UserImg from 'UserImg'
import { LatestTweetsIcon } from 'icons/Icon'
import Input from 'Input'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import Post from 'Post'

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    [db]
  )

  return (
    <div className='max-w-[600px] flex-grow border-gray-dark text-white-base sm:border-l sm:border-r xxs:sm:ml-[88px] xxs:xl:ml-[275px]'>
      <div className='bg-[rgba(0, 0, 0, 0.65)] sticky top-0 z-50 flex cursor-pointer items-center px-4 py-3 text-white-base backdrop-blur-md'>
        <UserImg className='mr-5 h-8 w-8 xxs:sm:hidden' />
        <h2 className='overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold sm:text-xl'>
          Latest Tweets
        </h2>
        <div className='hoverAnimation ml-auto flex h-9 w-9 items-center justify-center'>
          <LatestTweetsIcon className='h-5 w-5' />
        </div>
      </div>
      <Input />
      <div className='pb-72'>
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  )
}
