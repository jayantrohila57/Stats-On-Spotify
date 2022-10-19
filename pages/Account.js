import Head from "next/head";
import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import BackButton from '../components/BackButton'
import { useSession } from 'next-auth/react'
import UseSpotify from '../hooks/UseSpotify'
import Link from 'next/link'
function Account() {
  const [Data, setData] = useState([])
  const nav = '/Home'
  const session = useSession()
  const spotifyApi = UseSpotify()
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMe().then(function (data) {
        setData(data.body)
      })
    }
  }, [session, spotifyApi])
  return (
    <div>
      <Head>
        <title>Account | Stats On Spotify</title>
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
              "linear-gradient( rgba(0 ,0, 0, 0.1), rgba(0, 0, 0,0.9)),url('https://images.unsplash.com/photo-1581315628079-f093bb040803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="min-h-screen"
        >
          <div className="relative flex flex-row md:h-32 h-28 justify-center items-end">
            <BackButton props={nav} />
            <div className="text-4xl flex flex-row tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block dark:text-white ">My</span>
              <span className="block dark:text-green-400 ml-2 ">Account</span>
            </div>
          </div>
          <div className="flex pt-5 flex-col items-center justify-center">
            <Profile props={Data} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Account;
