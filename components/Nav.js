import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { signOut, signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
const Nav = ({
  activeClasses = 'text-green-400 font-medium',
  inactiveClasses = 'text-slate-100 hover:text-white focus:text-white',
  classes = 'text-base font-medium transition-colors hover:text-green-400',
}) => {
  const router = useRouter()
  const session = useSession()
  const logo = '/favicon.png'
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [IsShowing, setIsShowing] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      setIsShowing(false)
    })
  }, [])

  return (
    <div className="px-5 fixed w-screen backdrop-blur-sm rounded-lg duration-300 z-50">
      <div>
        <div className="flex justify-between items-center  py-3 md:justify-start md:space-x-5">
          <Link href="/#home">
            <div className="flex cursor-pointer justify-start items-center lg:w-0 lg:flex-1">
              <Image
                className="h-10 w-10 m-0.5"
                src={logo}
                width={40}
                height={40}
                alt="logo"
              />
              <span className="font-bold text-2xl  dark:text-white text-slate-600">
                <h1>Stats On Spotify</h1>
              </span>
            </div>
          </Link>
          <ul className="hidden  md:flex space-x-10">
            <Link href="/#home">
              <li className="text-white text-bold  hover:text-green-500 hover:scale-110 cursor-pointer duration-300">
                Home
              </li>
            </Link>
            <Link href="/Account">
              <li className="text-white text-bold  hover:text-green-500 hover:scale-110 cursor-pointer duration-300">
                Account
              </li>
            </Link>
            <Link href="/Contribute">
              <li className="text-white text-bold  hover:text-green-500 hover:scale-110 cursor-pointer duration-300">
                Contribute
              </li>
            </Link>
            <Link href="/More-Info">
              <li className="text-white text-bold  hover:text-green-500 hover:scale-110 cursor-pointer duration-300">
                More Info
              </li>
            </Link>
          </ul>
          <div className="-my-2 md:hidden">
            <button
              type="button"
              className="rounded-xl p-2 dark:text-white inline-flex items-center justify-center text-slate-400"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open menu</span>
              {/* Heroicon name: outline/menu */}
              <svg
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden pr-5 md:flex items-center justify-end md:flex-1 lg:w-0">
            {session?.status === 'unauthenticated' ? (
              <Link href="/Help">
                <div className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 ring-1 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                  Help
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </Link>
            ) : (
              <>
                <button
                  className="inline-block dark:text-white hover:text-green-400 p-1 h-8 text-sm hover:scale-105 duration-100"
                  onClick={() => {
                    signOut()
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Nav Bar */}
      <div
        className={
          open
            ? 'block  absolute top-0 inset-x-0  origin-top-right md:hidden'
            : 'opacity-0 hidden absolute top-0 inset-x-0 origin-top-right md:hidden'
        }
      >
        <div className="h-screen z-10 ">
          <div className="shadow-lg p-1 h-full bg-black bg-opacity-90  text-white duration-300 font-bold ">
            <div className="p-3 flex items-center justify-between">
              <Link href="/#home">
                <div
                  onClick={() => setOpen(!open)}
                  className="flex  justify-start items-center lg:w-0 lg:flex-1"
                >
                  <Image
                    className="h-10 w-10 m-0.5"
                    src={logo}
                    width={40}
                    height={40}
                    alt="logo"
                  />
                  <span className="font-bold text-2xl  dark:text-white text-slate-600">
                    <h1>Stats On Spotify</h1>
                  </span>
                </div>
              </Link>

              <div>
                <button
                  type="button"
                  className="text-white font-bold pr-4 inline-flex items-center justify-center"
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="h-full pb-10 flex flex-col justify-center">
              <div className="flex flex-col items-start p-1 justify-center">
                <h1 className="mx-5 font-extrabold border-b-2 border-dashed w-72 text-3xl text-green-400">
                  Menu
                </h1>
                <Link href="/">
                  <h1
                    onClick={() => setOpen(!open)}
                    className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
                  >
                    Go to Home
                  </h1>
                </Link>
                <Link href="/Account">
                  <h1
                    onClick={() => setOpen(!open)}
                    className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
                  >
                    My Account
                  </h1>
                </Link>
                <Link href="/Contribution">
                  <h1
                    onClick={() => setOpen(!open)}
                    className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
                  >
                    Contribution
                  </h1>
                </Link>
                <Link href="/More-Info">
                  <h1
                    onClick={() => setOpen(!open)}
                    className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
                  >
                    More Info
                  </h1>
                </Link>
              </div>
              <div className="flex pb-10 items-center p-4 justify-start gap-4 ">
                {session?.status === 'unauthenticated' ? (
                  <button
                    onClick={() => {
                      signIn('spotify')
                    }}
                    className="bg-black m-5 px-2 py-3 w-full rounded-xl mt-5 flex justify-center items-center text-lg hover:scale-105 duration-300 text-green-400"
                  >
                    Login with Spotify
                  </button>
                ) : (
                  <>
                    <Link href="/Account">
                      <div className="border-4 border-slate-100 p-2  rounded-3xl m-0 w-20 h-20  hover:bg-green-400 border-opacity-20 hover:scale-110 hover:text-green-400">
                        {session.status === 'authenticated' ? (
                          <Image
                            width={100}
                            height={100}
                            alt="logo"
                            className="rounded-3xl hover:shadow-md float-left h-20 w-20"
                            src={session?.data?.user?.image}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                    <div className="p-0 dark:text-slate-300">
                      <p className="md:text-2xl text-base text-green-400">
                        {session?.data?.user?.name}
                      </p>
                      <p className="md:text-lg text-xs truncate">
                        {session?.data?.user?.email}
                      </p>
                    </div>
                    <button
                      className="inline-block dark:text-white hover:text-green-400 p-1 h-8 text-sm hover:scale-105 duration-100"
                      onClick={() => {
                        signOut()
                      }}
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
