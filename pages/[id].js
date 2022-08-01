import Head from 'next/head'
import { ArrowLeftIcon } from 'icons/Icon'
import { useRouter } from 'next/router'
import Post from 'Post'
import Sidebar from 'Sidebar'
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Input from 'Input'
import Modal from 'Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { getProviders, useSession } from 'next-auth/react'
import Login from 'Login'
import Comment from 'Comment'

export default function PostPage({ providers }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db, id]
  )
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  if (!session) return <Login providers={providers} />

  return (
    <>
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Sidebar />
      <div className='max-w-[600px] flex-grow border-l border-r border-gray-dark text-white-base xxs:sm:ml-[88px] xxs:xl:ml-[275px]'>
        <div className='sticky top-0 z-50 flex items-center gap-x-4 bg-black bg-opacity-90 px-1.5 py-2 text-xl font-semibold text-white-base backdrop-blur-sm'>
          <div
            className='hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0'
            onClick={() => router.push('/')}
          >
            <ArrowLeftIcon className='text-white h-5' />
          </div>
          Tweet
        </div>
        <div className='divide-y divide-gray-dark'>
          <Post id={id} post={post} postPage />
          <div className='p-4'>
            <Input Modal postPage post={post} />
          </div>
        </div>
        {comments.length > 0 && (
          <div className='pb-72'>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                comment={comment.data()}
                postId={id}
                post={post}
              />
            ))}
          </div>
        )}
      </div>
      {/* widgets */}
      {isOpen && <Modal />}
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
