import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XIcon } from 'icons/Icon'
import { inputState } from '../atoms/modalAtom'

import Input from 'Input'

function InputModal() {
  const [isInputOpen, setIsInputOpen] = useRecoilState(inputState)

  return (
    <Transition appear show={isInputOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 pt-8'
        onClose={setIsInputOpen}
      >
        <div className='flex items-start justify-center px-4 pt-4 pb-20 text-center min-h-screen'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-light bg-opacity-40 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='inline-block transform rounded-2xl bg-black text-left shadow-xl transition-all my-8 w-full max-w-xl align-middle'>
              <div className='flex items-center px-1.5 py-2'>
                <div
                  className='hoverAnimation flex h-9 w-9 items-center justify-center'
                  onClick={() => setIsInputOpen(false)}
                >
                  <XIcon className='h-[22px] text-white-base' />
                </div>
              </div>
              <div className='w-full px-4 pb-2.5'>
                <Input InputModal />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default InputModal
