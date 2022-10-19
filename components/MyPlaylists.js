import React from "react";

function MyPlaylists(PlaylistsData) {
	const data = PlaylistsData.props.items;
	console.log(data);
	return (
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
                    {' '}
                    <img
                      className="md:p-1 rounded-2xl duration-100 border-opacity-0 hover:scale-95 object-cover md:w-44 md:h-44 w-24 h-24"
                      src={value?.images[0]?.url}
                      alt={value?.name}
                    />
                  </a>
                  <div className="hover:px-1 relative p-1 flex flex-col h-full items-start justify-between w-56 duration-200">
                    <div>
                      <p className="line-clamp-2 md:line-clamp-2 text-lg w-56 md:text-2xl inline font-bold tracking-tight text-gray-900 dark:text-white">
                        <a target="0" href={value?.external_urls?.spotify}>
                          {value?.name}
                        </a>
                      </p>
                      <p className="line-clamp-1 inline  md:line-clamp-2 text-sm w-52 tracking-tight font-bold text-green-500 ">
                        {value?.description}
                      </p>
                    </div>{' '}
                    <div className="flex flex-row flex-wrap w-60">
                      <a target="0" href={value?.owner?.external_urls?.spotify}>
                        <p className="md:font-sans font-bold text-xs md:rounded-lg rounded-md md:p-1.5 p-1 m-0.5 bg-black bg-opacity-90 hover:bg-green-800">
                          By
                          <span className="text-green-400 mx-1">
                            {value?.owner?.display_name}
                          </span>
                        </p>{' '}
                      </a>{' '}
                      <p className="md:font-sans font-bold text-xs md:rounded-lg rounded-md md:p-1.5 p-1 m-0.5 bg-black bg-opacity-90 hover:bg-green-800">
                        Tracks{' '}
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

export default MyPlaylists;
