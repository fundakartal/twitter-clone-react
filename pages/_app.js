import '../styles/globals.css'
import '../styles/emojiPicker.css'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Head>
          <title>Latest Tweets / Twitter</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className='mx-auto flex min-h-screen max-w-[1265px] pb-3'>
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
