export default function TopTracksList(Tracks) {
  const data = Tracks.props
  console.log(data)
  return (
    <>
      <div className="flex pt-5 flex-col scroll-smooth min-w-0 break-words w-[100vw] md:h-[70vh] h-[78vh]">
        <div className="h-[100vh] scroll-smooth m-1 rounded-xl scrollbar-thin overflow-y-scroll dark:scrollbar-thumb-green-900 dark:scrollbar-track-black">
          <div className="block scroll-smooth w-full overflow-x-auto">
            <div className="flex gap-2 flex-row flex-wrap content-start items-start justify-around mx-auto text-gray-900 dark:text-white ">
              {data?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-2xl hover:p-3 hover:backdrop-blur-md flex flex-col w-[95vw] flex-wrap md:max-w-md items-start h-36 md:h-48 md:p-2 p-2 bg-black hover:bg-gray-800  hover:bg-opacity-10 bg-opacity-30 duration-200 md:flex-row"
                  >
                    <a target="0" href={value?.external_urls?.spotify}>
                      <img
                        className="md:p-1 rounded-2xl duration-100 border-opacity-0 hover:scale-95 object-cover md:w-44 md:h-44 w-24 h-24"
                        src={value?.album?.images[0]?.url}
                        alt={value?.name}
                      />
                    </a>
                    <div className="hover:px-1 relative p-0.5 flex flex-col h-full items-start justify-between w-56 duration-200">
                      <div className="m-0.5">
                        <p className="line-clamp-2 md:line-clamp-2 text-2xl w-56 md:text-2xl inline font-bold tracking-tight text-gray-900 dark:text-white">
                          <a target="0" href={value?.external_urls?.spotify}>
                            {value?.name}
                          </a>
                        </p>
                        <p className="flex flex-row text-base w-52 tracking-tight font-bold text-gray-300 ">
                          <div className="mr-1 ">By </div>
                          <div className="line-clamp-2">
                            {value?.artists.map((artist, index) => {
                              return (
                                <span
                                  key={index}
                                  className="inline hover:underline text-green-400"
                                >
                                  {index > 0 ? (
                                    <span className="inline dark:text-green-400">
                                      ,
                                    </span>
                                  ) : (
                                    <p></p>
                                  )}{' '}
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
                        </p>{' '}
                        <p className="flex flex-row text-base w-52 tracking-tight font-bold text-gray-300 ">
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
                      </div>{' '}
                      <div className="flex flex-row flex-wrap w-60">
                        <p className="md:font-sans font-bold text-xs md:rounded-lg rounded-md md:p-1.5 p-1 m-0.5 bg-black bg-opacity-90 hover:bg-green-800">
                          Popularity
                          <span className="text-green-400 mx-1">
                            {value?.popularity}
                          </span>
                        </p>
                        <p className="md:font-sans font-bold text-xs md:rounded-lg rounded-md md:p-1.5 p-1 m-0.5 bg-black bg-opacity-90 hover:bg-green-800">
                          Track Number
                          <span className="text-green-400 mx-1">
                            {value?.track_number}
                          </span>
                        </p>
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
