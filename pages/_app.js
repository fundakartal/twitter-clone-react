import '../styles/globals.css'
import '../styles/emojiPicker.css'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Twitter</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mx-auto flex min-h-screen max-w-[1265px] pb-3'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}

export default MyApp
