import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import Nav from '../components/Nav'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <DefaultSeo
        title="Stats On Spotify | Your Top Tracks, Artists, Playlists & more."
        description="An Easy Approach To Review Your Spotify Data. Get all your top 50 Tracks, Artists,  and Playlists for Free, with Secure login with the official Spotify platform."
        canonical="https://statsonspotify.vercel.app/"
        openGraph={{
          type: 'website',
          locale: 'en_IN',
          url: 'https://statsonspotify.vercel.app/',
          title:
            'Stats On Spotify | Your Top Tracks, Artists, Playlists & more.',
          description:
            'An Easy Approach To Review Your Spotify Data. Get all your top 50 Tracks, Artists,  and Playlists for Free, with Secure login with the official Spotify platform.',
          images: [
            {
              url: '/image.png',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
            {
              url: '/image.png',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
              type: 'image/jpeg',
            },
            { url: '/image.png' },
            { url: '/image.png' },
          ],

          siteName: 'Stats On Spotify',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/image.png',
            sizes: '76x76',
          },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            rel: 'preload',
            href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100&family=Uncial+Antiqua&display=swap',
            as: 'font',
            type: 'font/poppins',
            crossOrigin: 'anonymous',
          },
        ]}
        twitter={{
          handle: 'https://statsonspotify.vercel.app/',
          site: 'https://statsonspotify.vercel.app/',
          cardType: 'summary_large_image',
        }}
      />
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
