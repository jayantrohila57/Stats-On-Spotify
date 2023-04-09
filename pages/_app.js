import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

import NextNprogress from 'nextjs-progressbar'
import Nav from '../components/Nav'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <NextNprogress
        color="green"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <SessionProvider session={session}>
        <main
          className="bg-black"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="h-[100vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 overflow-y-scroll dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
            <Nav />
            <Component {...pageProps} />
          </div>
        </main>
      </SessionProvider>
    </>
  )
}
