import Link from 'next/link'
import React from 'react'

function NavRouter({ name, value }) {
  return (
    <div className="md:w-full w-80 flex justify-between h-full md:flex-col flex-row ">
      <div className="flex md:h-full pt-10 md:w-72 bg-opacity-10 rounded-xl  w-auto items-center justify-between md:justify-start text-slate-300 font-bold pl-5  duration-300 text-2xl  md:text-5xl md:m-2 m-0">
        {name}
      </div>
      <Link href={value}>
        <button className="flex mt-10    md:h-14  text-green-400 md:w-72 w-10 justify-center items-center h-10">
          <svg
            className="w-10 -rotate-90 h-10 md:w-14 md:h-14  "
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
    </div>
  )
}

export default NavRouter
