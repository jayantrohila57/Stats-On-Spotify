import React from "react";

function StatsBox() {
	return (
		<div className="flex flex-row flex-wrap content-around justify-around  mx-auto  text-gray-900 dark:text-white ">
			<div className="p-3 m-5 w-64 h-40 dark:shadow-xl  dark:hover:dark:shadow-xl  dark:hover:bg-gray-700 border-2 dark:border-gray-600 rounded-xl  flex flex-col items-start  justify-start">
				<div className="flex flex-row items-center justify-between">
					<div>
						<dd className=" ml-2 font-light dark:text-xl text-gray-300 dark:text-gray-100">
							Total Users
						</dd>
						<dt className="ml-2 text-4xl font-extrabold  dark:text-green-400  ">
							24
						</dt>
					</div>
					<svg
						className="w-10 h-10 ml-10 dark:text-gray-600 "
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				</div>
				<div className="flex flex-row">
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Free User
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">14</dt>
					</div>
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Premium
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">6</dt>
					</div>
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Enterprise
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">4</dt>
					</div>
				</div>
			</div>
			<div className="p-3 m-5 w-64 h-40 dark:shadow-xl  dark:hover:dark:shadow-xl  dark:hover:bg-gray-700 border-2 dark:border-gray-600 rounded-xl  flex flex-col items-start  justify-start">
				<div className="flex flex-row items-center justify-between">
					<div>
						<dd className=" ml-2 font-light dark:text-xl text-gray-300 dark:text-gray-100">
							Total Requests
						</dd>
						<dt className="ml-2 text-4xl font-extrabold  dark:text-green-400  ">
							34
						</dt>
					</div>

					<svg
						className="w-10 h-10 ml-10 dark:text-gray-600 "
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
						/>
					</svg>
				</div>
				<div className="flex flex-row">
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Cloud
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">9</dt>
					</div>
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Network
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">11</dt>
					</div>
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Web
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">11</dt>
					</div>
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Mobile
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">3</dt>
					</div>
				</div>
			</div>
			<div className="p-3 m-5 w-64 h-40 dark:shadow-xl  dark:hover:dark:shadow-xl  dark:hover:bg-gray-700 border-2 dark:border-gray-600 rounded-xl  flex flex-col items-start  justify-start">
				<div className="flex flex-row items-center justify-between">
					<div>
						<dd className=" ml-2 font-light dark:text-xl text-gray-300 dark:text-gray-100">
							Total Payment
						</dd>
						<dt className="ml-2 text-4xl font-extrabold  dark:text-green-400  ">
							11
						</dt>
					</div>
					<svg
						className="w-10 h-10 ml-10 dark:text-gray-600 "
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div className="flex flex-row">
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Free User
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">2</dt>
					</div>
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Premium
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">6</dt>
					</div>
					<div className="mx-2">
						<dd className="mt-2 font-light dark:text-sm text-gray-300 dark:text-gray-100">
							Enterprise
						</dd>
						<dt className=" text-lg font-bold  dark:text-green-400  ">3</dt>
					</div>
				</div>
			</div>
			<div className="p-3 m-5  w-64  h-40 dark:shadow-2xl  dark:hover:dark:shadow-xl  dark:hover:bg-gray-700 border-2 dark:border-gray-600 rounded-xl  flex flex-row items-start justify-start">
				<div className="flex flex-row items-start justify-start">
					<div>
						<dd className=" ml-2 font-light dark:text-xl text-gray-300 dark:text-gray-100">
							Inactive Users
						</dd>
						<dt className=" ml-2 text-4xl font-extrabold  dark:text-green-400  ">
							75
						</dt>
					</div>
					<svg
						className="w-10 h-10 ml-5 dark:text-gray-600 "
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
			</div>
			<div className="p-3 m-5  w-64  h-40 dark:shadow-2xl  dark:hover:dark:shadow-xl  dark:hover:bg-gray-700 border-2 dark:border-gray-600 rounded-xl  flex flex-row items-start justify-start">
				<div className="flex flex-row items-start justify-start">
					<div>
						<dd className=" ml-2 font-light dark:text-xl text-gray-300 dark:text-gray-100">
							Total Blogs No
						</dd>
						<dt className=" ml-2 text-4xl font-extrabold  dark:text-green-400  ">
							16
						</dt>
					</div>
					<svg
						className="w-10 h-10 ml-10 dark:text-gray-600 "
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
							/>
						</svg>
					</svg>
				</div>
			</div>
			<div className="p-3 m-5  w-64  h-40 dark:shadow-2xl  dark:hover:dark:shadow-xl  dark:hover:bg-gray-700 border-2 dark:border-gray-600 rounded-xl  flex flex-row items-start justify-start">
				<div className="flex flex-row items-start justify-start">
					<div>
						<dd className=" ml-2 font-light dark:text-xl text-gray-300 dark:text-gray-100">
							Contacts Forms
						</dd>
						<dt className=" ml-2 text-4xl font-extrabold  dark:text-green-400  ">
							9
						</dt>
					</div>
					<svg
						className="w-10 h-10 ml-5 dark:text-gray-600 "
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default StatsBox;
