import React, { useEffect, useState } from "react";
export default function TopTracksList() {
	const data = [
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Premium",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Web",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			members: "Free",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Web",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Premium",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Cloud",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Premium",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Web",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Free",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Cloud",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Premium",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Web",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Free",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Web",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Premium",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Cloud",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Free",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Web",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
		{
			name: "Jayant",
			email: "jrohila55@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
			membership: "Premium",
			request: "20",
			userId: "354131543543",
			PentestId: "14431684326",
			StripeId: "3136465435132",
			PentestType: "Cloud",
			PentestData:
				"https://lh3.googleusercontent.com/a-/AFdZucqy27ZYRZMWb7w5Pae4wsZ6MKPSrTXzAvMgwjrRtwc=s96-c",
		},
	];
	function copy(text) {
		navigator.clipboard.writeText(text);
	}

	const RequestComplete = () => {
		alert("Set Request Complete");
	};
	const RequestCancled = () => {
		alert("Set Request Cancled");
	};

	const [Data, setData] = useState([]);

	return (
		<>
			<div className="p-1 m-2 flex flex-col min-w-0 break-words w-full h-[65vh]  border-2 border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-white">
				<div className="h-[100vh] scrollbar-thin  scrollbar-thumb-gray-700 scrollbar-track-gray-300 overflow-y-scroll dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
					<div className="block w-full overflow-x-auto">
						<table className="items-center w-full bg-transparent ">
							<tbody>
								{data.map((value, index) => {
									return (
										<tr
											key={index}
											className="grid lg:gap-0 border-2 p-2 mb-1 mr-3  rounded-lg dark:border-gray-700 lg:grid-cols-12 grid-cols-5 dark:shadow-2xl  dark:hover:dark:shadow-xl  dark:hover:bg-gray-700"
										>
											<td className="rounded-xl  md:text-xs text-xs   lg:col-span-3 col-span-3 flex-row flex items-center justify-start">
												<div className="rounded-full mt-1 w-10 h-10 border-2 hover:bg-indigo-600 border-opacity-30 hover:scale-110 hover:text-indigo-600">
													{!value.userImage ? (
														<svg
															className="rounded-full dark:text-white hover:shadow-md float-left w-8 h-8"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 22 22"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
															></path>
														</svg>
													) : (
														<img
															className="rounded-full hover:shadow-md float-left h-full"
															src={value.userImage}
														/>
													)}
												</div>
												<div className="mx-2 mb-2 h-10 dark:text-gray-300">
													<p className="text-xs dark:text-gray-200">
														{value?.userName}
													</p>
													<p className="text-xs dark:text-gray-200">
														{value?.userEmail}
													</p>
													<p className="text-xs dark:text-green-400">
														{value?.membership}Free User
													</p>
												</div>
											</td>

											<td className="rounded-xl   text-xs  flex-row lg:col-span-3 col-span-2 flex items-center justify-start">
												<div className="flex flex-col justify-start  items-start">
													<span className="md:text-xs text-xs text-grey-600 dark:text-gray-300">
														User ID
													</span>
													<p className="text-xs md:text-xs truncate  dark:text-indigo-600">
														{value.id}
													</p>
												</div>
												<div>
													<button onClick={() => copy(value.PentestData)}>
														<svg
															className="w-6 h-6 ml-2 dark:text-gray-300 dark:hover:text-indigo-600"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
															/>
														</svg>
													</button>
												</div>
											</td>
											<td className="rounded-xl   text-xs  flex-row lg:col-span-3 col-span-2 flex items-center justify-start">
												<div className="flex flex-col justify-start  items-start">
													<span className="md:text-xs text-xs text-grey-600 dark:text-gray-300">
														Stripe ID
													</span>
													<p className="text-xs md:text-xs truncate  dark:text-indigo-600">
														{value.StripeId}Not Available
													</p>
												</div>
												<div>
													<button onClick={() => copy(value.PentestData)}>
														<svg
															className="w-6 h-6 ml-2 dark:text-gray-300 dark:hover:text-indigo-600"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
															/>
														</svg>
													</button>
												</div>
											</td>

											<td className="rounded-xl  md:text-xs text-xs 	lg:col-span-3 col-span-2 flex-row flex items-center justify-start">
												<div className="flex flex-col justify-start  items-start">
													<span className="md:text-xs text-xs text-grey-600 dark:text-gray-300">
														Total Requests
														<span className="ml-2 text-xs md:text-xs truncate w-16 dark:text-green-400">
															{value.TotalRequestComplete}Not Availabe
														</span>
													</span>{" "}
													<span className="md:text-xs text-xs text-grey-600 dark:text-gray-300">
														Request Left
														<span className="ml-2 text-xs md:text-xs truncate w-16 dark:text-green-400">
															{value.RequestAvailable}Not Availabe
														</span>
													</span>{" "}
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
