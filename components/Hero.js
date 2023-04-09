import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'

import Link from 'next/link'
import Image from 'next/image'

export function ChevronDoubleDownIcon(props) {
  return (
    <Link href="/">
      <button className="hover:scale-115 duration-300 transition">
        <svg
          className="text-white animate-bounce   h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </Link>
  )
}

function Hero() {
  const session = useSession()
  return (
    <div className="relative ">
      <div className="w-full z-30 absolute md:bottom-5  bottom-10 justify-center flex items-center h-20 my-2">
        <ChevronDoubleDownIcon />
      </div>
      <div className="top-0 md:min-h-[100vh] h-[100vh] object-cover overflow-hidden w-full ">
        <Image
          src={`https://images.unsplash.com/photo-1623018035813-9cfb5b502e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80`}
          layout="fill"
          className="h-full opacity-50 md:opacity-40 contrast-125 object-cover  w-full"
          alt="hero-background-image"
        />
      </div>
      <section className="md:min-h-[100vh] h-[100vh]  w-full   bg-gradient-to-tr from-black via-transparent to-black  absolute top-0 flex flex-row flex-wrap items-center justify-center">
        <div className="flex flex-row flex-wrap items-center content-center justify-center">
          <div className="sm:text-left lg:text-left">
            <div className="p-5">
              <h1 className="tracking-tight text-left font-bold text-gray-900  ">
                <span className="block dark:text-white sm:inline text-7xl md:text-9xl">
                  Welcome to
                  <br />
                </span>
                <span className="block tracking-tight dark:text-green-400 sm:inline text-8xl md:text-9xl">
                  Stats On Spotify
                </span>
              </h1>
            </div>
            <div className="px-5">
              <h1 className="text-2xl tracking-tight text-left font-bold text-gray-900 sm:text-5xl md:text-5xl">
                <span className="block dark:text-gray-300 xl:inline">
                  An Easy Approach To
                  <br /> Review Your Spotify Data
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
