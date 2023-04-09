import Image from 'next/image'

export default function TopTracksList(Tracks) {
  const data = Tracks.props

  return (
    <>
      <div className='flex pt-5 flex-col scroll-smooth min-w-0  break-words w-full h-[80vh] md:h-screen bg-black'>
        <div className='md:h-[100vh] h-[80vh] scroll-smooth m-1 duration-300 snap-y snap-mandatory  rounded-xl scrollbar-thin overflow-y-scroll scrollbar-thumb-green-900 scrollbar-track-black'>
          <div className='block scroll-smooth w-full duration-300 snap-y snap-mandatory  overflow-x-auto'>
            <div className='flex gap-2 flex-row flex-wrap scroll-smooth duration-300 snap-y snap-mandatory  content-start items-start justify-around mx-auto  text-white'>
              {data?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className='snap-center snap-normal rounded-2xl hover:scale-95 hover:backdrop-blur-md flex flex-col w-[95vw] bg-gray-400 bg-opacity-10 flex-wrap md:max-w-5xl items-start h-36 md:h-32 md:p-2 p-1  hover:bg-opacity-30 duration-200 md:flex-row'>
                    <div className='flex flex-row'>
                      <div className='flex relative flex-col md:flex-row'>
                        <div className='absolute'>
                          <h1 className='flex   justify-center items-center md:w-36 h-10 md:h-full text-xl md:text-5xl font-extrabold text-gray-200'>
                            <svg className='w-6 h-6 md:w-14 md:h-14 inline' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                              <path
                                fillRule='evenodd'
                                d='M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z'
                                clipRule='evenodd'
                              />
                            </svg>
                            {index + 1}
                          </h1>
                        </div>
                        <div className='md:w-32 w-20 mr-1'>
                          <Image
                            width={110}
                            height={110}
                            className='md:p-1 rounded-2xl duration-300 border-opacity-0 object-cover'
                            src={value?.album?.images[0]?.url}
                            alt={value?.name}
                          />
                        </div>
                      </div>
                      <div className=''>
                        <p className='line-clamp-2 md:max-w-2xl md:line-clamp-1 text-xl w-full md:text-2xl inline font-bold tracking-tight text-gray-300'>
                          <a target='0' href={value?.external_urls?.spotify}>
                            {value?.name}
                          </a>
                        </p>
                        <p className='flex flex-row  text-sm md:text-base tracking-tight font-bold text-gray-300 '>
                          <div className='mr-1 '>By </div>
                          <div className='line-clamp-2'>
                            {value?.artists.map((artist, index) => {
                              return (
                                <span key={index} className='inline hover:underline text-green-400'>
                                  {index > 0 ? <span className='inline text-green-500'>, </span> : <p></p>}
                                  <a target='0' href={artist?.external_urls?.spotify}>
                                    {artist.name}
                                  </a>
                                </span>
                              )
                            })}
                          </div>
                        </p>
                        <p className='flex flex-row text-xs md:text-base tracking-tight font-bold text-gray-300 '>
                          <div className='mr-1'>Album </div>
                          <a target='0' href={value?.album?.external_urls?.spotify}>
                            <span className='text-green-400  hover:underline line-clamp-1'>{value?.album?.name}</span>
                          </a>
                        </p>
                        <div className='flex flex-row flex-wrap '>
                          <p className='md:font-sans h-auto font-normal text-xs md:text-sm '>
                            Popularity
                            <span className='text-green-400 mx-1'>{value?.popularity}</span>
                          </p>
                          <p className='md:font-sans h-auto font-normal text-xs md:text-sm '>
                            Track Number
                            <span className='text-green-400 mx-1'>{value?.track_number}</span>
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
