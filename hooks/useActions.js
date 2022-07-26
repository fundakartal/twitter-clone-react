import { useEffect, useState } from 'react'
import { collection, onSnapshot, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atoms/modalAtom'

export default function (id) {
  const { data: session } = useSession()
  const [reTweets, setReTweets] = useState([])
  const [reTweeted, setReTweeted] = useState(false)
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'reTweets'), (snapshot) =>
        setReTweets(snapshot.docs)
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

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.name,
      })
    }
  }

  const reTweetPost = async () => {
    if (reTweeted) {
      await deleteDoc(doc(db, 'posts', id, 'reTweets', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'reTweets', session.user.uid), {
        username: session.user.name,
      })
    }
  }

  const deletePost = async () => {
    await deleteDoc(doc(db, 'posts', id))
  }

  return [
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
  ]
}
