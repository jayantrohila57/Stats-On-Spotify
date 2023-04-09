import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import UseSpotify from '../hooks/UseSpotify'
import NewItems from '../components/NewItems'
import MyPlaylists from '../components/MyPlaylists'
import Profile from '../components/Profile'
import TopArtistsList from '../components/TopArtistsList'
import TopTracksList from '../components/TopTracksList'
import NavRouter from '../components/NavRouter'
import Hero from '../components/Hero'
import InfoSection from '../components/InfoSection'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
export default function Home() {
  const spotifyApi = UseSpotify()
  const session = useSession()
  const [Data, setData] = useState([])
  const [TopArtists, setTopArtists] = useState([])
  const [NewReleases, setNewReleases] = useState([])
  const [PlaylistsData, setPlaylistsData] = useState([])
  const [Tracks, setTracks] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getNewReleases({ limit: 50, offset: 0 }).then(function (data) {
        setNewReleases(data.body.albums.items)
      })
      spotifyApi.getMe().then(function (data) {
        setData(data.body)
      })
      spotifyApi
        .getUserPlaylists(Data?.user?.id, { limit: 50, offset: 0 })
        .then(function (data) {
          setPlaylistsData(data.body)
        })
      spotifyApi
        .getMyTopArtists({ limit: 50, offset: 0 })
        .then(function (data) {
          setTopArtists(data.body.items)
        })
      spotifyApi.getMyTopTracks({ limit: 50, offset: 0 }).then(function (data) {
        setTracks(data.body.items)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, spotifyApi])

  return (
    <>
      <NextSeo
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
            href: '/favicon.ico',
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
      <div className="flex flex-col bg-black">
        <div className="h-screen scrollbar-thin scrollbar-thumb-slate-700 duration-300 snap-y snap-mandatory scroll-smooth scrollbar-track-slate-300 overflow-y-scroll dark:scrollbar-thumb-green-900 dark:scrollbar-track-black">
          <div className="snap-center snap-normal">
            <Hero />
          </div>
          <div className="snap-center snap-normal">
            <InfoSection />
          </div>

          {session.status === 'authenticated' ? (
            <>
              <div
                id="top-50-songs"
                className="flex snap-end flex-col md:flex-row"
              >
                <div className="bg-black w-10/12 h-1/6 md:w-3/12 md:h-[80vh] md:pt-20">
                  <NavRouter name="Your Top #50 Songs That You Listen the most." />
                </div>
                <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-9/12">
                  <TopTracksList props={Tracks} />
                </div>
              </div>
              <div
                id="top-50-Artists"
                className="flex snap-end flex-col md:flex-row"
              >
                <div className="bg-black w-10/12 h-1/6 md:w-1/5 md:h-screen">
                  <NavRouter name="Your Top #50 Artists That You Listen the most." />
                </div>
                <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-5/6">
                  <TopArtistsList props={TopArtists} />
                </div>
              </div>
              <div
                id="All-Playlists"
                className="flex snap-end flex-col md:flex-row"
              >
                <div className="bg-black w-10/12 h-1/6 md:w-1/5 md:h-screen">
                  <NavRouter name="All Of Your Playlists are Here Check Them Out." />
                </div>
                <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-5/6">
                  <MyPlaylists props={PlaylistsData} />
                </div>
              </div>
              <div
                id="New-Release"
                className="flex snap-end flex-col md:flex-row"
              >
                <div className="bg-black w-10/12 h-1/6 md:w-1/5 md:h-screen">
                  <NavRouter name="New Release that we hope you like them." />
                </div>
                <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-5/6">
                  <NewItems props={NewReleases} />
                </div>
              </div>{' '}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex fixed backdrop-blur-sm text-xs bottom-0 w-screen text-slate-100 justify-center items-center py-2">
          <h2 className="items-center text-center">
            {' '}
            © 2023 StatsOnSpotify. All Rights Reserved.
            <br className="md:hidden block" />{' '}
            <span className="hover:underline text-green-500">
              <Link href="https://github.com/jayantrohila57">
                Creator: @JayantRohila57
              </Link>
            </span>
          </h2>
        </div>
      </div>
    </>
  )
}
