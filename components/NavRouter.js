import React from 'react'

function NavRouter({ name }) {
  return (
    <div className="w-full ">
      <div className="flex h-full md:w-72 bg-opacity-10 rounded-xl p-1 items-center justify-center md:justify-start text-slate-300 font-bold pl-5  duration-300 text-3xl  md:text-5xl m-2">
        {name}
      </div>
    </div>
  )
}

export default NavRouter
