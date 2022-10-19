import React from 'react'
import Link from 'next/link'

function BackButton(nav) {
  const value = nav.props
  return (
    <Link href={value}>
      <button className="absolute md:left-10 left-4 bottom-0 text-green-400">
        <svg
          className="md:w-16  md:h-16 h-10 w-10"
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
  )
}

export default BackButton
