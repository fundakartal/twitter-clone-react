import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='min-h-screen flex max-w-[1265px] mx-auto pb-3'>
        <Component {...pageProps} />
      </main>

    </>
  )
}

export default MyApp
