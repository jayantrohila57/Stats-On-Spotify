import Image from 'next/image'

export default function TopArtistsList(TopArtists) {
  const data = TopArtists.props
  return (
    <>
      <div className="flex md:pt-20 py-5 flex-col scroll-smooth   break-words w-full h-[75vh] md:h-screen bg-black">
        <div className="md:h-[80vh] h-[75vh] scroll-smooth m-1 duration-300 snap-y snap-mandatory  rounded-xl scrollbar-thin overflow-y-scroll scrollbar-thumb-green-900 scrollbar-track-black">
          <div className="block scroll-smooth md:w-full duration-300 snap-y snap-mandatory ">
            <div className="flex gap-2 flex-row flex-wrap scroll-smooth duration-300 snap-y snap-mandatory  content-start items-start justify-around mx-auto  text-white">
              {data?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-2xl hover:scale-95 flex items-center md:p-2  flex-col w-[95vw] flex-wrap md:max-w-md  h-36 md:h-36  bg-slate-200 bg-opacity-10  hover:bg-opacity-20  duration-200 md:flex-row p-2"
                  >
                    <div className="md:w-32 w-32">
                      <Image
                        width={160}
                        height={160}
                        className="md:p-1 rounded-2xl  duration-100 border-opacity-0  object-cover md:w-44 md:h-44 w-32 h-32"
                        src={value?.images[0]?.url}
                        alt={value?.name}
                      />
                    </div>
                    <div className="md:ml-3 ml-0 md:p-1 p-2 flex flex-col h-full items-start justify-between md:w-72 w-52 duration-200">
                      <div className="">
                        <span className="justify-start items-center text-sm md:text-2xl font-bold text-green-500">
                          <svg
                            className="w-5 h-5 mb-1 md:h-7 md:w-7  inline"
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
                        <p className="line-clamp-2 md:line-clamp-2 text-sm md:w-72 w-52 md:text-2xl inline font-bold tracking-tight text-slate-900 dark:text-white">
                          <a target="0" href={value?.external_urls?.spotify}>
                            {value?.name}
                          </a>
                        </p>
                        <h2 className="line-clamp-1 inline  md:line-clamp-2 text-xs md:w-72 w-52 tracking-tight font-bold text-slate-300 ">
                          {value?.genres.map((genera, index) => {
                            return (
                              <span
                                key={index}
                                className="inline hover:underline text-slate-400 leading-1 line-clamp-1"
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
                        </h2>
                      </div>
                      <div className="flex flex-row flex-wrap w-68 mb-5">
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
