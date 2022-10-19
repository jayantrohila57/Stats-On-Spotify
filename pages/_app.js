import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from '../components/Footer'
import NextNprogress from "nextjs-progressbar";
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
        <header className="dark:bg-gray-800">
          <Nav />
        </header>
        <main
          className="dark:bg-gray-800"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="h-[100vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 overflow-y-scroll dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
            <Component {...pageProps} />
            <Footer />
          </div>
        </main>
      </SessionProvider>
    </>
  )
}
