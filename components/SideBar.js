import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function SideBar() {
	const router = useRouter();
	const [toggleState, setToggleState] = useState(1);

	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-16 z-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  bg-white dark:bg-gray-900 flex flex-wrap items-center justify-between relative md:w-64  py-10 px-6">
				<div className="md:flex-col  pt-10 md:items-stretch md:flex-nowrap px-0 flex flex-wrap items-center justify-between mx-auto">
					<ul className="flex flex-col mt-10 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
						<Link href="/Home">
							<div
								className={
									router.pathname === "/Home" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Home"
										? "inline-flex m-2  p-4 w-56 text-green-400 rounded-lg active border-2 border-green-400  dark:text-green-400 dark:border-green-400 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									aria-hidden="true"
									className={
										router.pathname === "/Home" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Home"
											? "mr-2 w-5 h-5 text-green-400 dark:text-green-400"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
								</svg>
								Dashboard
							</div>
						</Link>
						<Link href="/Home/Top-tracks">
							<div
								className={
									router.pathname === "/Home/Top-tracks" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Home/Top-tracks"
										? "inline-flex m-2 p-4 w-56 text-green-400 rounded-lg active border-2 border-green-400  dark:text-green-400 dark:border-green-400 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									className={
										router.pathname === "/Home/Top-tracks" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Home/Top-tracks"
											? "mr-2 w-5 h-5 text-green-400 dark:text-green-400"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="currentColor"
									stroke="currentColor"
									viewBox="0 0 26 26"
								>
									<path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
								</svg>
								Top Tracks
							</div>
						</Link>
						<Link href="/Home/Top-Artists">
							<div
								className={
									router.pathname === "/Home/Top-Artists" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Home/Top-Artists"
										? "inline-flex m-2 p-4 w-56 text-green-400 rounded-lg active border-2 border-green-400  dark:text-green-400 dark:border-green-400 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									className={
										router.pathname === "/Home/Top-Artists" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Home/Top-Artists"
											? "mr-2 w-5 h-5 text-green-400 dark:text-green-400"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="currentColor"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
								</svg>
								Top Artists
							</div>
						</Link>
						<Link href="/Home/Top-Albums">
							<div
								className={
									router.pathname === "/Home/Top-Albums" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Home/Top-Albums"
										? "inline-flex m-2 p-4 w-56 text-green-400 rounded-lg active border-2 border-green-400  dark:text-green-400 dark:border-green-400 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									aria-hidden="true"
									className={
										router.pathname === "/Home/Top-Albums" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Home/Top-Albums"
											? "mr-2 w-5 h-5 text-green-400 dark:text-green-400"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
								</svg>
								Top Albums
							</div>
						</Link>
						<Link href="/Home/Recent-Streams">
							<div
								className={
									router.pathname === "/Home/Recent-Streams" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Home/Recent-Streams"
										? "inline-flex m-2 p-4 w-56 text-green-400 rounded-lg active border-2 border-green-400  dark:text-green-400 dark:border-green-400 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									aria-hidden="true"
									className={
										router.pathname === "/Home/Recent-Streams" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Home/Recent-Streams"
											? "mr-2 w-5 h-5 text-green-400 dark:text-green-400"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								</svg>
								Recent Streams
							</div>
						</Link>
					</ul>
				</div>
			</nav>
		</>
	);
}
