import Image from 'next/image'
import React from 'react'

function NewItems(NewReleases) {
  const data = NewReleases?.props
  // console.log(NewReleases)
  return (
    <div className="flex md:pt-20 py-5 flex-col scroll-smooth min-w-0  break-words w-full h-[75vh] md:h-screen bg-black">
      <div className="md:h-[80vh] h-[75vh] scroll-smooth m-1 duration-300 snap-y snap-mandatory  rounded-xl scrollbar-thin overflow-y-scroll scrollbar-thumb-green-900 scrollbar-track-black">
        <div className="block scroll-smooth w-full duration-300 snap-y snap-mandatory  overflow-x-auto">
          <div className="flex gap-2 flex-row flex-wrap scroll-smooth duration-300 snap-y snap-mandatory  content-start items-start justify-around mx-auto  text-white">
            {data?.map((value, index) => {
              return (
                <div
                  key={index}
                  className="rounded-2xl flex flex-col  w-[95vw] flex-wrap md:max-w-5xl items-start h-32 md:h-32 md:p-2 p-2 bg-slate-200 hover:bg-opacity-20 bg-opacity-10 duration-200 md:flex-row"
                >
                  <a
                    target="0"
                    className="relative md:w-32 w-28 mr-1"
                    href={value?.external_urls?.spotify}
                  >
                    {' '}
                    <Image
                      width={110}
                      height={110}
                      className="md:p-1 rounded-2xl duration-300 border-opacity-0  object-cover"
                      src={value?.images[0]?.url}
                      alt={value?.name}
                    />
                  </a>
                  <div className="relative px-2 flex flex-col   w-52  h-full items-start justify-between duration-200">
                    <div className="m-0.5">
                      <p className="line-clamp-1 md:line-clamp-2 text-sm w-52 md:w-full md:text-2xl inline font-bold tracking-tight text-slate-900 dark:text-white">
                        <a target="0" href={value?.external_urls?.spotify}>
                          {value?.name}
                        </a>
                      </p>
                      <p className="line-clamp-1 inline  md:line-clamp-2 text-xs md:text-base w-52 md:w-full tracking-tight font-bold text-slate-300 ">
                        {value?.artists.map((artist, index) => {
                          return (
                            <>
                              <span
                                key={index}
                                className="inline hover:underline text-green-400"
                              >
                                {index > 0 ? (
                                  <span className="inline  dark:text-green-400">
                                    ,
                                  </span>
                                ) : (
                                  <p></p>
                                )}{' '}
                                <a
                                  target="0"
                                  href={artist?.external_urls?.spotify}
                                >
                                  {artist?.name}
                                </a>
                              </span>
                            </>
                          )
                        })}
                      </p>
                    </div>{' '}
                    <div className="flex flex-col text-slate-200 flex-wrap w-52">
                      <p className="w-60 text-xs">
                        Total No. of Tracks{' '}
                        <span className="text-green-400 mx-1">
                          {value?.total_tracks}
                        </span>
                      </p>{' '}
                      <p className="w-60 text-xs hidden md:block">
                        Album Type
                        <span className="text-green-400 mx-1">
                          {value?.album_type}
                        </span>
                      </p>
                      <p className="w-60 text-xs">
                        Release Date
                        <span className="text-green-400 mx-1">
                          {value?.release_date}
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
  )
}

export default NewItems
