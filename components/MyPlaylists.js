import React from "react";

function MyPlaylists(PlaylistsData) {
	const data = PlaylistsData.props.items;
	console.log(data);
	return (
		<div className="p-1 flex flex-col min-w-0 break-words backdrop-blur-md w-full h-[70vh] shadow-2xl  border-2 border-gray-600 rounded-2xl text-white">
			<div className="h-[100vh] m-1 rounded-xl scrollbar-thin  overflow-y-scroll dark:scrollbar-thumb-green-900 dark:scrollbar-track-black">
				<div className="block w-full overflow-x-auto">
					<div className="flex flex-row flex-wrap content-start items-start justify-start  mx-auto  text-gray-900 dark:text-white ">
						{data?.map((value, index) => {
							return (
								<div
									key={index}
									className="rounded-2xl m-1 p-3 flex flex-col md:max-w-lg items-start h-48  hover:bg-white hover:p-2 bg-white hover:bg-opacity-30 bg-opacity-10 duration-300 dark:shadow-2xl hover:dark: dark:hover:dark:shadow-xl  hover:bg-gradient-to-tr md:flex-row"
								>
									<img
										className="rounded-xl duration-300 border-opacity-0 hover:scale-105 object-cover w-44 h-44"
										src={value.images[0]?.url}
										alt=""
									/>
									<div className="flex flex-col flex-wrap w-80 p-3">
										<div>
											<p className="line-clamp-3 text-xl inline font-bold tracking-tight text-gray-900 dark:text-white">
												{value.name}
											</p>
											<p className="line-clamp-3 text-xs font-light text-gray-300 ">
												{value.description}
											</p>
										</div>

										<div className="flex flex-row flex-wrap">
											<p className="font-bold">
												Tracks{" "}
												<span className="text-green-400 mx-1">
													{value?.tracks?.total}
												</span>
											</p>
											<p className="font-bold">
												Owner
												<span className="text-green-400 mx-1">
													{value?.owner?.display_name}
												</span>
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyPlaylists;
