import Head from 'next/head'
import BackButton from '../components/BackButton'
import { signOut, signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
function Profile(Data) {
  const session = useSession()
  const user = Data.props
  console.log(user)

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      <BackButton props="/#getStarted" />
      <section className="text-slate-600 body-font bg-slate-500 shadow-2xl bg-opacity-10 md:p-5 rounded-3xl">
        <div className="container mx-auto flex md:px-10 py-5 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/3 w-5/6 mb-10 md:mb-0">
            <Image
              width={350}
              height={350}
              className="shadow-2xl rounded-full"
              src={session?.data?.user?.image}
              alt={session?.data?.user?.name}
            />
          </div>
          <div className="lg:flex-grow md:w-2/3 lg:pl-24 md:pl-2 flex flex-col md:items-start md:text-left items-center text-center">
            <div className="flex flex-col md:w-full w-[90vw]">
              <h1 className="md:text-7xl text-5xl w-full leading-tight font-bold text-slate-200">
                {session?.data?.user?.name}
              </h1>
              <br />
              <h2 className="text-4xl font-bold text-slate-200">
                {user?.followers?.total}{' '}
                <span className="text-green-500 inline">Followers</span>
              </h2>{' '}
              <h2 className="text-2xl truncate font-bold text-slate-600">
                {user?.email}
              </h2>{' '}
            </div>
            <div className="flex my-10 justify-center">
              {session ? (
                <button
                  onClick={() => {
                    signOut('spotify')
                  }}
                  className="bg-green-500 px-5 bg-opacity-10 py-3 w-full rounded-xl m-1 flex justify-center items-center text-lg hover:scale-105 duration-300 text-green-400"
                >
                  Logout from Spotify
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn('spotify')
                  }}
                  className="bg-green-500 px-5  bg-opacity-10 py-3 w-full rounded-xl m-1 flex justify-center items-center text-lg hover:scale-105 duration-300 text-green-400"
                >
                  Login with Spotify
                </button>
              )}{' '}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
