import Image from 'next/image'
import UseSpotify from '../hooks/UseSpotify'

export default function TopTracksList(Tracks) {
  const data = Tracks.props
  const spotifyApi = UseSpotify()
  // const playSong = (track) => {
  //   spotifyApi.play(
  //     {
  //       uris: [track.uri],
  //     },

  //     function (err) {
  //       if (err) {
  //         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
  //         console.log('Something went wrong!', err)
  //       }
  //     }
  //   )
  // }
  function PlayCircleIcon(props) {
    return (
      <svg
        className="h-14 w-14 "
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
        />
      </svg>
    )
  }

  return (
    <>
      <div className="flex md:pt-20 py-5 flex-col scroll-smooth min-w-0  break-words w-full h-[80vh] md:h-screen bg-black">
        <div className="md:h-[80vh] h-[80vh] scroll-smooth m-1 duration-300 snap-y snap-mandatory  rounded-xl scrollbar-thin overflow-y-scroll scrollbar-thumb-green-900 scrollbar-track-black">
          <div className="block scroll-smooth w-full duration-300 snap-y snap-mandatory  overflow-x-auto">
            <div className="flex gap-2 flex-row flex-wrap scroll-smooth duration-300 snap-y snap-mandatory  content-start items-start justify-around mx-auto  text-white">
              {data?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="snap-center group snap-normal rounded-2xl  hover:backdrop-blur-md flex flex-col w-[95vw] bg-slate-200 bg-opacity-10 flex-wrap md:max-w-5xl items-start h-32 md:h-32 md:p-2 p-2 hover:bg-gray-500 hover:bg-opacity-30 duration-300 transition md:flex-row"
                  >
                    <div className="flex flex-row">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-32 w-28 mr-1">
                          {/* <button
                            className="group-hover:flex hidden  absolute top-6 left-6 z-20"
                            onClick={() => playSong(value)}
                          >
                            <PlayCircleIcon />
                          </button> */}
                          <Image
                            width={110}
                            height={110}
                            className="md:p-1 rounded-2xl duration-300 border-opacity-0  object-cover"
                            src={value?.album?.images[0]?.url}
                            alt={value?.name}
                          />
                        </div>
                      </div>
                      <div className="p-1">
                        <p className="line-clamp-2 md:max-w-2xl md:line-clamp-1 text-base w-full md:text-2xl inline font-bold tracking-tight text-slate-300">
                          <p className=" text-green-500 inline mr-2">
                            {' '}
                            <svg
                              className="w-5 h-5 md:h-7 md:w-7  inline"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {index + 1}
                          </p>{' '}
                          <a target="0" href={value?.external_urls?.spotify}>
                            {value?.name}
                          </a>
                        </p>
                        <p className="flex flex-row  text-xs md:text-base tracking-tight font-bold text-slate-300 ">
                          <div className="mr-1 text-slate-300">By </div>
                          <div className="md:line-clamp-2 line-clamp-1">
                            {value?.artists.map((artist, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline hover:underline text-green-400"
                                >
                                  {index > 0 ? (
                                    <span className="inline text-green-500">
                                      ,{' '}
                                    </span>
                                  ) : (
                                    <p></p>
                                  )}
                                  <a
                                    target="0"
                                    href={artist?.external_urls?.spotify}
                                  >
                                    {artist.name}
                                  </a>
                                </span>
                              )
                            })}
                          </div>
                        </p>
                        <p className="flex flex-row text-xs md:text-base tracking-tight font-bold text-slate-300 ">
                          <div className="mr-1">Album </div>
                          <a
                            target="0"
                            href={value?.album?.external_urls?.spotify}
                          >
                            <span className="text-green-400  hover:underline line-clamp-1">
                              {value?.album?.name}
                            </span>
                          </a>
                        </p>
                        <div className="flex flex-row flex-wrap ">
                          <p className=" h-auto  text-xs md:text-sm ">
                            Popularity
                            <span className="text-green-400 mx-1">
                              {value?.popularity}
                            </span>
                          </p>
                          <p className=" h-auto text-xs md:text-sm ">
                            Track Number
                            <span className="text-green-400 mx-1">
                              {value?.track_number}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
