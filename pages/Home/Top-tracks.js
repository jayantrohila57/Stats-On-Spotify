import React, { useEffect, useState } from "react";
import Head from 'next/head'
import UseSpotify from '../../hooks/UseSpotify'
import TopTracksList from '../../components/TopTracksList'
import BackButton from '../../components/BackButton'

import { useSession } from 'next-auth/react'
export default function TopTrack() {
  const nav = '/Home'
  const [Tracks, setTracks] = useState([])
  const session = useSession()
  const spotifyApi = UseSpotify()
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks().then(function (data) {
        setTracks(data.body.items)
      })
    }
  }, [session, spotifyApi])
  return (
    <div>
      <Head>
        <title>Top Tracks | Stats On Spotify</title>
        <meta
          name="description"
          content="Response with User data on Spotify."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          style={{
            backgroundImage:
              "linear-gradient( rgba(0 ,0, 0, 0.2), rgba(0,0,0,0.4)),url('https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BvdGlmeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="min-h-screen"
        >
          <div className="relative flex flex-row md:h-32 h-28 justify-center items-end">
            <BackButton props={nav} />
            <div className="text-4xl flex flex-row tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block dark:text-white ">Top</span>
              <span className="block dark:text-green-400 ml-2 ">Tracks</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <TopTracksList props={Tracks} />
          </div>
        </div>
      </main>
    </div>
  )
}
