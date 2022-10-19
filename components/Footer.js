import React from 'react'

function Footer() {
  return (
    <footer className="p-4 absolute bottom-0 w-full z-20  backdrop-blur-sm">
      <div className="mx-auto max-w-screen-xl text-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022-2023{' '}
          <a href="#" className="hover:underline">
            StatsOnSpotify
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
