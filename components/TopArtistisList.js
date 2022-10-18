import React, { useEffect, useState } from "react";
export default function TopArtistsList(Artists) {
	const data = Artists.props;
	// console.log(data);
	function copy(text) {
		navigator.clipboard.writeText(text);
	}
	const [Data, setData] = useState([]);
	return (
		<>
			<div className="p-1 flex flex-col min-w-0 break-words w-full h-[70vh] shadow-2xl  bg-opacity-10 backdrop-blur-md   border-2 border-gray-600 rounded-3xl text-white">
				<div className="h-[100vh] m-1 rounded-3xl scrollbar-thin  overflow-y-scroll dark:scrollbar-thumb-green-900 dark:scrollbar-track-black">
					<div className="block w-full overflow-x-auto">
						<table className="items-center w-full bg-transparent ">
							<tbody>
								{data.map((value, index) => {
									return (
										<tr
											key={index}
											className="flex rounded-2xl shadow-2xl mr-3 border-2 m-1 dark:border-gray-700 hover:m-1.5 hover:relative hover:bg-white hover:bg-opacity-20 duration-300 dark:shadow-2xl hover:dark: dark:hover:dark:shadow-xl  hover:bg-gradient-to-tr"
										>
											<td className="flex-row flex items-center justify-start">
												<div className="p-1 w-28 h-28 duration-300 border-opacity-0 hover:scale-105 hover:text-indigo-600">
													<img
														className="rounded-xl shadow-2xl float-left h-full"
														src={value.images[1].url}
													/>
												</div>
												<div className="p-2 w-[250px] max-w-[250px] h-full  dark:text-gray-300">
													<p className="text-base h-full flex flex-col justify-start align-top items-start dark:text-gray-200">
														<span className="dark:text-green-400 xl:inline">
															Name
														</span>
														{value?.name}
													</p>
												</div>
												<div className="p-2 w-[300px] max-w-[300px] h-full  dark:text-gray-300">
													<p className="text-base h-full inline  justify-start align-top items-start dark:text-gray-200">
														<span className="block dark:text-green-400 xl:inline">
															Genres
														</span>
														<br />

														{value?.genres.map((genera, index) => {
															return (
																<span
																	key={index}
																	className="inline break-words"
																>
																	{index > 0 ? (
																		<span className="inline dark:text-green-400">
																			,
																		</span>
																	) : (
																		<p></p>
																	)}{" "}
																	{genera}
																</span>
															);
														})}
													</p>
												</div>
												<div className="p-2 w-[200px] max-w-[200px] h-full  dark:text-gray-300">
													<p className="text-base h-full flex flex-col justify-start align-top items-start dark:text-gray-200">
														<span className="block dark:text-green-400 xl:inline">
															Followers
														</span>
														{value?.followers.total}
													</p>
												</div>
												<div className="p-2 w-[150px] max-w-[150px] h-full  dark:text-gray-300">
													<p className="text-base h-full flex flex-col justify-start align-top items-start dark:text-gray-200">
														<span className="block dark:text-green-400 xl:inline">
															Followers
														</span>
														{value?.followers.total}
													</p>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
