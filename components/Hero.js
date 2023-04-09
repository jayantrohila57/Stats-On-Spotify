import React from 'react'
import {signIn, useSession} from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
function Hero() {
  const session = useSession()
  return (
    <div className=''>
      <section className='min-h-[100vh] flex flex-row flex-wrap items-center justify-center'>
        <div className='flex flex-row flex-wrap items-center content-center justify-center'>
          <div className='sm:text-left lg:text-left'>
            <div className='p-5'>
              <h1 className='tracking-tight text-left font-bold text-gray-900  '>
                <span className='block dark:text-white sm:inline text-7xl md:text-9xl'>
                  Welcome to
                  <br />
                </span>
                <span className='block tracking-tight dark:text-green-400 sm:inline text-7xl md:text-9xl'>Stats On Spotify</span>
              </h1>
            </div>
            <div className='px-5'>
              <h1 className='text-2xl tracking-tight text-left font-bold text-gray-900 sm:text-5xl md:text-5xl'>
                <span className='block dark:text-gray-300 xl:inline'>
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
