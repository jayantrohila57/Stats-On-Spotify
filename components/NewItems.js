import Image from 'next/image'
import React from 'react'

function NewItems(NewReleases) {
  const data = NewReleases?.props
  // console.log(NewReleases)
  return (
    <div className='flex pt-5 flex-col scroll-smooth min-w-0  break-words w-full h-[80vh] md:h-screen bg-black'>
      <div className='md:h-[100vh] h-[80vh] scroll-smooth m-1 duration-300 snap-y snap-mandatory  rounded-xl scrollbar-thin overflow-y-scroll scrollbar-thumb-green-900 scrollbar-track-black'>
        <div className='block scroll-smooth w-full duration-300 snap-y snap-mandatory  overflow-x-auto'>
          <div className='flex gap-2 flex-row flex-wrap scroll-smooth duration-300 snap-y snap-mandatory  content-start items-start justify-around mx-auto  text-white'>
            {data?.map((value, index) => {
              return (
                <div
                  key={index}
                  className='rounded-3xl hover:backdrop-blur-md flex flex-col hover:scale-95 w-[95vw] flex-wrap md:max-w-4xl items-start h-36 md:h-44 md:p-2 p-2 bg-gray-200 hover:bg-opacity-20 bg-opacity-10 duration-200 md:flex-row'>
                  <a target='0' className='md:w-32 w-20 mr-1' href={value?.external_urls?.spotify}>
                    {' '}
                    <Image
                      width={160}
                      height={160}
                      objectFit='fill'
                      className='md:p-1 rounded-2xl duration-100 border-opacity-0  object-cover md:w-44 md:h-44 w-10 h-10'
                      src={value?.images[0]?.url}
                      alt={value?.name}
                    />
                  </a>
                  <div className='relative p-2 flex flex-col h-full items-start justify-between w-[80%] duration-200'>
                    <div className='m-0.5'>
                      <p className='line-clamp-2 md:line-clamp-2 text-lg md:text-2xl inline font-bold tracking-tight text-gray-900 dark:text-white'>
                        <a target='0' href={value?.external_urls?.spotify}>
                          {value?.name}
                        </a>
                      </p>
                      <p className='line-clamp-1 inline  md:line-clamp-2 text-base w-96 tracking-tight font-bold text-gray-300 '>
                        {value?.artists.map((artist, index) => {
                          return (
                            <>
                              <span key={index} className='inline hover:underline text-green-400'>
                                {index > 0 ? <span className='inline  dark:text-green-400'>,</span> : <p></p>}{' '}
                                <a target='0' href={artist?.external_urls?.spotify}>
                                  {artist?.name}
                                </a>
                              </span>
                            </>
                          )
                        })}
                      </p>
                    </div>{' '}
                    <div className='flex flex-row flex-wrap w-96'>
                      <p className='md:font-sans font-bold text-xs md:rounded-lg rounded-md md:p-1.5 p-1 m-0.5 bg-black bg-opacity-90 hover:bg-green-800'>
                        Tracks
                        <span className='text-green-400 mx-1'>{value?.total_tracks}</span>
                      </p>{' '}
                      <p className='md:font-sans font-bold text-xs md:rounded-lg rounded-md md:p-1.5 p-1 m-0.5 bg-black bg-opacity-90 hover:bg-green-800'>
                        Type
                        <span className='text-green-400 mx-1'>{value?.album_type}</span>
                      </p>
                      <p className='md:font-sans font-bold text-xs md:rounded-lg rounded-md md:p-1.5 p-1 m-0.5 bg-black bg-opacity-90 hover:bg-green-800'>
                        Release
                        <span className='text-green-400 mx-1'>{value?.release_date}</span>
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
