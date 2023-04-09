import Image from 'next/image'
import React from 'react'

function MyPlaylists(PlaylistsData) {
  const data = PlaylistsData.props.items
  return (
    <div className="flex md:pt-20 py-5 flex-col scroll-smooth min-w-0  break-words w-full h-[80vh] md:h-screen bg-black">
      <div className="md:h-[80vh] h-[80vh] scroll-smooth m-1 duration-300 snap-y snap-mandatory  rounded-xl scrollbar-thin overflow-y-scroll scrollbar-thumb-green-900 scrollbar-track-black">
        <div className="block scroll-smooth w-full duration-300 snap-y snap-mandatory  overflow-x-auto">
          <div className="flex gap-2 flex-row flex-wrap scroll-smooth duration-300 snap-y snap-mandatory  content-start items-start justify-around mx-auto  text-white">
            {data?.map((value, index) => {
              return (
                <div
                  key={index}
                  className="rounded-2xl  flex items-center md:p-2  flex-col w-[95vw] flex-wrap md:max-w-md  h-32 md:h-36  bg-slate-200 bg-opacity-10  hover:bg-opacity-20  duration-200 md:flex-row p-2"
                >
                  <a
                    target="0"
                    className="md:w-32 w-28 mr-2"
                    href={value?.external_urls?.spotify}
                  >
                    {' '}
                    <Image
                      className="md:p-1 rounded-2xl duration-100 border-opacity-0 hover:scale-95 object-cover md:w-44 md:h-44 w-32 h-32"
                      src={value?.images[0]?.url}
                      width={150}
                      height={150}
                      alt={value?.name}
                    />
                  </a>
                  <div className="relative px-1 flex flex-col h-full items-start justify-between w-60 duration-200">
                    <div>
                      <p className="line-clamp-2 md:line-clamp-2 text-lg w-60 md:text-2xl inline font-bold tracking-tight text-slate-900 dark:text-white">
                        <a target="0" href={value?.external_urls?.spotify}>
                          {value?.name}
                        </a>
                      </p>
                      <p className="line-clamp-1 inline  md:line-clamp-2 text-xs w-60 tracking-tight font-bold text-green-500 ">
                        {value?.description}
                      </p>
                    </div>{' '}
                    <div className="flex flex-col flex-wrap w-60">
                      <a target="0" href={value?.owner?.external_urls?.spotify}>
                        <p className="w-60 text-xs line-clamp-1">
                          Made By
                          <span className="text-green-400 mx-1">
                            {value?.owner?.display_name}
                          </span>
                        </p>{' '}
                      </a>{' '}
                      <p className="w-60 text-xs">
                        Total No. of Tracks{' '}
                        <span className="text-green-400 mx-1">
                          {value?.tracks?.total}
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

export default MyPlaylists
