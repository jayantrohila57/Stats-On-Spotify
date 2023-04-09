import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

function InfoSection() {
  const session = useSession()
  return (
    <>
      <section
        id="getStarted"
        className=" flex justify-center items-center h-screen w-screen"
      >
        <div className="mx-auto">
          <div className="flex md:flex-row flex-col flex-wrap justify-center items-center">
            <div className="md:w-4/12 w-11/12 p-2 md:p-5 flex flex-col justify-center items-center">
              <div className="flex pb-10 items-center p-4 justify-start gap-4 ">
                {session?.status === 'unauthenticated' ? (
                  <></>
                ) : (
                  <>
                    <Link href="/Account">
                      <div className="border-4 border-slate-100 p-1  rounded-3xl m-0 w-20 h-20  hover:bg-green-400 border-opacity-20 hover:scale-105 hover:text-green-400">
                        {session.status === 'authenticated' ? (
                          <Image
                            width={400}
                            height={400}
                            alt="logo"
                            className="rounded-3xl hover:shadow-md float-left h-full"
                            src={session?.data?.user?.image}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                    <div className="p-0 dark:text-slate-300">
                      <p className="text-2xl text-green-400">
                        {session?.data?.user?.name}
                      </p>
                      <p className="text-lg truncate">
                        {session?.data?.user?.email}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <h1 className="md:p-5 hidden md:block md:m-1 m-5 p-1 text-slate-100 font-bold text-4xl md:text-5xl ">
                We offers These Services to You for free!
              </h1>

              <h1 className="md:p-5 md:hidden m-2 md:m-5 p-1 text-slate-100 font-bold text-4xl md:text-5xl ">
                We offers These Services to You for free!
              </h1>
              <div className="flex my-5 justify-center">
                {session.status === 'authenticated' ? (
                  <button
                    onClick={() => {
                      signOut('spotify')
                    }}
                    className="bg-green-500 max-w-xs px-5 bg-opacity-10 border border-green-500 border-opacity-50 py-3 w-full rounded-xl m-1 flex justify-center items-center text-xl text-semibold hover:scale-105 duration-300 text-green-400"
                  >
                    Logout from Spotify
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      signIn('spotify')
                    }}
                    className="bg-green-500 max-w-xs px-5  bg-opacity-10 border border-green-500 border-opacity-50 py-3 w-full rounded-xl m-1 flex justify-center items-center text-xl text-semibold hover:scale-105 duration-300 text-green-400"
                  >
                    Login with Spotify
                  </button>
                )}{' '}
              </div>
            </div>
            <div className="md:w-8/12 w-full">
              <div className="flex flex-row flex-wrap justify-evenly items-center">
                <Link href={'/#top-50-songs'}>
                  <div className="md:h-60 md:w-96 h-40 border-4 border-green-500 border-opacity-50 hover:scale-95 duration-300 transition hover:bg-opacity-25 w-40 md:m-5 m-2 bg-green-500 p-1 md:p-5 bg-opacity-10 rounded-2xl">
                    <div className="font-bold text-slate-300 hover:text-green-500 md:text-4xl text-base p-2">
                      <svg
                        className="w-10 h-10 mb-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                      <a href="/courses">
                        Your Top #50 Songs That You Listen the most.
                      </a>
                    </div>
                  </div>
                </Link>{' '}
                <Link href={'/#top-50-Artists'}>
                  <div className="md:h-60 md:w-96 h-40 border-4 border-green-500 border-opacity-50 hover:scale-95 duration-300 transition hover:bg-opacity-25 w-40 md:m-5 m-2 bg-green-500 p-1 md:p-5 bg-opacity-10 rounded-2xl">
                    <div className="font-bold text-slate-300 hover:text-green-500 md:text-4xl text-base p-2">
                      <svg
                        className="w-10 h-10 mb-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <a href="/courses">
                        Your Top #50 Artists That You Listen the most.
                      </a>
                    </div>
                  </div>
                </Link>{' '}
                <Link href={'/#All-Playlists'}>
                  <div className="md:h-60 md:w-96 h-40 border-4 border-green-500 border-opacity-50 hover:scale-95 duration-300 transition hover:bg-opacity-25 w-40 md:m-5 m-2 bg-green-500 p-1 md:p-5 bg-opacity-10 rounded-2xl">
                    <div className="font-bold text-slate-300 hover:text-green-500 md:text-4xl text-base p-2">
                      <svg
                        className="w-10 h-10 mb-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                      </svg>
                      <a href="/courses">
                        All Of Your Playlists That you follows.
                      </a>
                    </div>
                  </div>
                </Link>
                <Link href={'/#New-Release'}>
                  <div className="md:h-60 md:w-96 h-40 border-4 border-green-500 border-opacity-50 hover:scale-95 duration-300 transition hover:bg-opacity-25 w-40 md:m-5 m-2 bg-green-500 p-1 md:p-5 bg-opacity-10 rounded-2xl">
                    <div className="font-bold text-slate-300 hover:text-green-500 md:text-4xl text-base p-2">
                      <svg
                        className="w-10 h-10 mb-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                      <a href="/courses">
                        New Release, that We hope you will like them.
                      </a>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default InfoSection
