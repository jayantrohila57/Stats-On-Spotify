import Image from 'next/image'

export default function TopArtistsList(TopArtists) {
  const data = TopArtists.props
  return (
    <>
      <div className="flex pt-5 flex-col scroll-smooth min-w-0  break-words w-full h-[80vh] md:h-screen bg-black">
        <div className="md:h-[100vh] h-[80vh] scroll-smooth m-1 duration-300 snap-y snap-mandatory  rounded-xl scrollbar-thin overflow-y-scroll scrollbar-thumb-green-900 scrollbar-track-black">
          <div className="block scroll-smooth w-full duration-300 snap-y snap-mandatory  overflow-x-auto">
            <div className="flex gap-2 flex-row flex-wrap scroll-smooth duration-300 snap-y snap-mandatory  content-start items-start justify-around mx-auto  text-white">
              {data?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-2xl hover:scale-95 flex items-center md:p-2  flex-col w-[95vw] flex-wrap md:max-w-lg  h-36 md:h-44  bg-gray-200 bg-opacity-10  hover:bg-opacity-20  duration-200 md:flex-row"
                  >
                    <a
                      target="0"
                      className="md:w-32 w-20 mr-1"
                      href={value?.external_urls?.spotify}
                    >
                      <Image
                        width={160}
                        height={160}
                        className="md:p-1 rounded-2xl  duration-100 border-opacity-0  object-cover md:w-44 md:h-44 w-24 h-24"
                        src={value?.images[0]?.url}
                        alt={value?.name}
                      />
                    </a>
                    <div className="hover:px-1 ml-3 relative p-0.5 flex flex-col h-full items-start justify-between w-56 duration-200">
                      <div className="">
                        <span className="justify-start items-center text-2xl font-bold text-gray-200">
                          <svg
                            className="w-6 pb-1 h-6 inline"
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
                        </span>{' '}
                        <p className="line-clamp-2 md:line-clamp-2 text-2xl w-72 md:text-2xl inline font-bold tracking-tight text-gray-900 dark:text-white">
                          <a target="0" href={value?.external_urls?.spotify}>
                            {value?.name}
                          </a>
                        </p>
                        <p className="line-clamp-2 inline  md:line-clamp-2 text-base w-72 tracking-tight font-bold text-gray-300 ">
                          {value?.genres.map((genera, index) => {
                            return (
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
                                {genera}
                              </span>
                            )
                          })}
                        </p>
                      </div>
                      <div className="flex flex-row flex-wrap w-72 mb-5">
                        <p className="md:font-sans font-bold text-xs ">
                          Popularity
                          <span className="text-green-400 mx-1">
                            {value?.popularity}
                          </span>
                        </p>
                        <p className="md:font-sans font-bold text-xs ">
                          Followers
                          <span className="text-green-400 mx-1">
                            {value?.followers?.total}
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
