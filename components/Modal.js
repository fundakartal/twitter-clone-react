import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Moment from 'react-moment'
import { XIcon } from 'icons/Icon'
import { modalState, postIdState } from '../atoms/modalAtom'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import Input from 'Input'

function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [post, setPost] = useState()
  const [postId, setPostId] = useRecoilState(postIdState)

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db]
  )

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50 pt-8' onClose={setIsOpen}>
        <div className='flex min-h-[800px] items-start justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-light bg-opacity-40 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block transform rounded-2xl bg-black text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle'>
              <div className='flex items-center px-1.5 py-2'>
                <div
                  className='hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0'
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className='h-[22px] text-white-base' />
                </div>
              </div>
              <div className='flex px-4 pt-5 pb-2.5 sm:px-6'>
                <div className='w-full'>
                  <div className='relative flex gap-x-3 text-gray-light'>
                    <span className='absolute left-5 top-11 z-[-1] h-full w-0.5 bg-gray-600' />
                    <img
                      src={post?.userImg}
                      alt=''
                      className='h-12 w-12 rounded-full transition-opacity ease-in-out hover:opacity-90'
                    />
                    <div>
                      <div className='group inline-block'>
                        <h4 className='inline-block text-[15px] font-bold text-white-base sm:text-base'>
                          {post?.username.split(' ')[0]}
                        </h4>
                        <span className='ml-1.5 text-sm sm:text-[15px]'>
                          @{post?.tag}{' '}
                        </span>
                      </div>{' '}
                      ·{' '}
                      <span className='text-sm hover:underline sm:text-[15px]'>
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className='text-[15px] text-white-base sm:text-base'>
                        {post?.text}
                      </p>
                    </div>
                  </div>
                  <div className='mt-7 w-full'>
                    <Input Modal post={post} />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
