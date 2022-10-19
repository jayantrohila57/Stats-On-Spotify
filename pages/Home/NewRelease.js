import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import Head from 'next/head'
import UseSpotify from '../../hooks/UseSpotify'
import NewItems from '../../components/NewItems'
import { useSession } from 'next-auth/react'
export default function NewRelease() {
  const nav = '/Home'
  const [NewReleases, setNewReleases] = useState([])
  const session = useSession()
  const spotifyApi = UseSpotify()
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getNewReleases({ limit: 50, offset: 0 }).then(function (data) {
        setNewReleases(data.body.albums.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div>
      <Head>
        <title>New Release| Stats On Spotify</title>
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
              "linear-gradient( rgba(0 ,0, 0, 0.9), rgba(0,0,0,0.2)),url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative flex flex-row md:h-32 h-28 justify-center items-end">
            <BackButton props={nav} />
            <div className="text-4xl flex flex-row tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block dark:text-white ">New</span>
              <span className="block dark:text-green-400 ml-2 ">Release</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {' '}
            <NewItems props={NewReleases} />
          </div>
        </div>
      </main>
    </div>
  )
}
