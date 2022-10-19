import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import Head from 'next/head'
import UseSpotify from '../../hooks/UseSpotify'
import MyPlaylists from '../../components/MyPlaylists'
import { useSession } from 'next-auth/react'
export default function Playlists() {
  const nav = '/Home'
  const [PlaylistsData, setPlaylistsData] = useState([])
  const session = useSession()
  const spotifyApi = UseSpotify()
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists('9yo13loxl69oqp0hueroypa45', { limit: 50 })
        .then(function (data) {
          setPlaylistsData(data.body)
        })
    }
  }, [session, spotifyApi])

  return (
    <div>
      <Head>
        <title>My Playlists | Stats On Spotify</title>
        <meta
          name="description"
          content="Response with User data on Spotify."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          className="min-h-screen"
          style={{
            backgroundImage:
              "linear-gradient( rgba(0 ,0, 0, 0.2), rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative flex flex-row md:h-32 h-28 justify-center items-end">
            <BackButton props={nav} />
            <div className="text-4xl flex flex-row tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block dark:text-white ">My</span>
              <span className="block dark:text-green-400 ml-2 ">Playlists</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {' '}
            <MyPlaylists props={PlaylistsData} />
          </div>
        </div>
      </main>
    </div>
  )
}
