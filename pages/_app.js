import '../styles/globals.css'
import '../styles/emojiPicker.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mx-auto flex min-h-screen max-w-[1265px] pb-3'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
