import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders, useSession } from 'next-auth/react'
import Login from 'Login'
import Modal from 'Modal'
import { useRecoilState } from 'recoil'
import { inputState, modalState } from '../atoms/modalAtom'
import InputModal from 'InputModal'

export default function Home({ providers }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [isInputOpen, setIsInputOpen] = useRecoilState(inputState)
  if (!session) return <Login providers={providers} />

  return (
    <>
      <Sidebar />
      <Feed />
      {/* widgets */}
      {isOpen && <Modal />}
      {isInputOpen && <InputModal />}
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
