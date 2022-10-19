import BackButton from '../../components/BackButton'
import Head from 'next/head'
import Link from 'next/link'
export default function Home() {
  const nav = '/'
  return (
    <div>
      <Head>
        <title>Home | Stats On Spotify</title>
        <meta
          name="description"
          content="Response with User data on Spotify."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          className="min-h-screen"
          style={{
            backgroundImage:
              "linear-gradient( rgba(0 ,0, 0, 0.9), rgba(0,0,0,0.2)),url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative flex flex-row md:h-32 h-28 justify-center items-end">
            <BackButton props={nav} />
            <div className="text-4xl flex flex-row tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block dark:text-white ">Home</span>
              <span className="block dark:text-green-400 ml-2 ">Page</span>
            </div>
          </div>
          <div className="p-2 mt-10 flex flex-row flex-wrap items-center justify-start">
            <Link href="/Home/Playlists">
              <div className="rounded-2xl m-2 hover:p-3 hover:backdrop-blur-md flex flex-col w-[95vw] flex-wrap md:max-w-xs items-start h-36 md:h-36 md:p-2 p-2 bg-black hover:bg-gray-800  hover:bg-opacity-10 bg-opacity-30 duration-200 md:flex-row">
                <div>
                  <dt className="ml-2 text-4xl font-extrabold  dark:text-green-400  ">
                    My Playlists
                  </dt>
                </div>
              </div>
            </Link>
            <Link href="/Home/NewRelease">
              <div className="rounded-2xl m-2 hover:p-3 hover:backdrop-blur-md flex flex-col w-[95vw] flex-wrap md:max-w-xs items-start h-36 md:h-36 md:p-2 p-2 bg-black hover:bg-gray-800  hover:bg-opacity-10 bg-opacity-30 duration-200 md:flex-row">
                <div>
                  <dt className="ml-2 text-4xl font-extrabold  dark:text-green-400  ">
                    New Release
                  </dt>
                </div>
              </div>
            </Link>
            <Link href="/Home/Top-Artists">
              <div className="rounded-2xl m-2 hover:p-3 hover:backdrop-blur-md flex flex-col w-[95vw] flex-wrap md:max-w-xs items-start h-36 md:h-36 md:p-2 p-2 bg-black hover:bg-gray-800  hover:bg-opacity-10 bg-opacity-30 duration-200 md:flex-row">
                <div>
                  <dt className="ml-2 text-4xl font-extrabold  dark:text-green-400  ">
                    My Top Artists
                  </dt>
                </div>
              </div>
            </Link>
            <Link href="/Home/Top-tracks">
              <div className="rounded-2xl m-2 hover:p-3 hover:backdrop-blur-md flex flex-col w-[95vw] flex-wrap md:max-w-xs items-start h-36 md:h-36 md:p-2 p-2 bg-black hover:bg-gray-800  hover:bg-opacity-10 bg-opacity-30 duration-200 md:flex-row">
                <div>
                  <dt className="ml-2 text-4xl font-extrabold  dark:text-green-400  ">
                    My Top Tracks
                  </dt>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
