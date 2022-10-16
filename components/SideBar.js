import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function SideBar() {
	const router = useRouter();
	const [toggleState, setToggleState] = useState(1);

	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-16 z-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  bg-white dark:bg-gray-800 flex flex-wrap items-center justify-between relative md:w-64  py-10 px-6">
				<div className="md:flex-col  pt-10 md:items-stretch md:flex-nowrap px-0 flex flex-wrap items-center justify-between mx-auto">
					<ul className="flex flex-col mt-10 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
						<Link href="/Admin">
							<div
								className={
									router.pathname === "/Admin" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Admin"
										? "inline-flex m-2  p-4 w-56 text-indigo-600 rounded-lg active border-2 border-indigo-600  dark:text-indigo-600 dark:border-indigo-500 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									aria-hidden="true"
									className={
										router.pathname === "/Admin" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Admin"
											? "mr-2 w-5 h-5 text-indigo-600 dark:text-indigo-600"
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

						<Link href="/Admin/Payment-History">
							<div
								className={
									router.pathname === "/Admin/Payment-History" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Admin/Payment-History"
										? "inline-flex m-2 p-4 w-56 text-indigo-600 rounded-lg active border-2 border-indigo-600  dark:text-indigo-600 dark:border-indigo-500 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									className={
										router.pathname === "/Admin/Payment-History" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Admin/Payment-History"
											? "mr-2 w-5 h-5 text-indigo-600 dark:text-indigo-600"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
									></path>
								</svg>
								Payment History
							</div>
						</Link>
						<Link href="/Admin/Pentest-Requests">
							<div
								className={
									router.pathname === "/Admin/Pentest-Requests" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Admin/Pentest-Requests"
										? "inline-flex m-2 p-4 w-56 text-indigo-600 rounded-lg active border-2 border-indigo-600  dark:text-indigo-600 dark:border-indigo-500 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									className={
										router.pathname === "/Admin/Pentest-Requests" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Admin/Pentest-Requests"
											? "mr-2 w-5 h-5 text-indigo-600 dark:text-indigo-600"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									></path>
								</svg>
								Pentest Requests
							</div>
						</Link>
						<Link href="/Admin/Users">
							<div
								className={
									router.pathname === "/Admin/Users" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Admin/Users"
										? "inline-flex m-2 p-4 w-56 text-indigo-600 rounded-lg active border-2 border-indigo-600  dark:text-indigo-600 dark:border-indigo-500 group"
										: "inline-flex m-2 p-4 w-56 rounded-lg  border-2 dark:border-gray-700  hover:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300 group"
								}
							>
								<svg
									aria-hidden="true"
									className={
										router.pathname === "/Admin/Users" ||
										new URL(router.query.callbackUrl, "http://localhost:3000")
											.pathname == "/Admin/Users"
											? "mr-2 w-5 h-5 text-indigo-600 dark:text-indigo-600"
											: "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
									}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
								</svg>
								Users
							</div>
						</Link>
					</ul>
				</div>
			</nav>
		</>
	);
}
