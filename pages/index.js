import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders, useSession } from 'next-auth/react'
import Login from 'Login'
import Modal from 'Modal'
import { useRecoilState } from 'recoil'
import { inputState, modalState } from '../atoms/modalAtom'
import InputModal from 'InputModal'
import Widgets from 'Widgets'

export default function Home({ providers, trendingResults, followResults }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [isInputOpen, setIsInputOpen] = useRecoilState(inputState)
  if (!session) return <Login providers={providers} />

  return (
    <>
      <Sidebar />
      <Feed />
      <Widgets
        trendingResults={trendingResults}
        followResults={followResults}
      />
      {isOpen && <Modal />}
      {isInputOpen && <InputModal />}
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/FHYK').then(
    (res) => res.json()
  )
  return {
    props: {
      providers,
      trendingResults,
      followResults,
    },
  }
}
