import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { signOut, signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
const Nav = ({
	activeClasses = "text-green-400 font-medium",
	inactiveClasses = "text-gray-100 hover:text-white focus:text-white",
	classes = "text-base font-medium transition-colors hover:text-green-400",
}) => {
	const router = useRouter();
	const session = useSession();
	const logo = "";
	const [open, setOpen] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [IsShowing, setIsShowing] = useState(false);

	useEffect(() => {
		Router.events.on("routeChangeComplete", () => {
			setIsShowing(false);
		});
	}, []);

	return (
		<div className="px-5 fixed w-screen backdrop-blur-sm z-10">
			<div>
				<div className="flex justify-between items-center  py-3 md:justify-start md:space-x-5">
					<Link href="/">
						<div className="flex  justify-start items-center lg:w-0 lg:flex-1">
							<Image src="" alt="" width="30" height="30" />

							<span className="ml-1 font-bold text-2xl dark:text-white text-gray-600">
								<h1>Stats On Spotify</h1>
							</span>
						</div>
					</Link>
					<div className="-my-2 md:hidden">
						<button
							type="button"
							className="rounded-xl p-2  dark:text-white inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							onClick={() => setOpen(!open)}
						>
							<span className="sr-only">Open menu</span>
							{/* Heroicon name: outline/menu */}
							<svg
								className="h-9 w-9"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
					<nav className="hidden md:flex space-x-10">
						<Link href="/Home">
							<a
								className={`${classes} ${
									router.pathname === "/Home" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Home"
										? activeClasses
										: inactiveClasses
								} focus:${activeClasses.split(" ").join(" focus:")}`}
							>
								Home
							</a>
						</Link>
						<Link href="/Account">
							<a
								className={`${classes} ${
									router.pathname === "/Account" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Account"
										? activeClasses
										: inactiveClasses
								} focus:${activeClasses.split(" ").join(" focus:")}`}
							>
								Account
							</a>
						</Link>
						<Link href="/Contribute">
							<a
								className={`${classes} ${
									router.pathname === "/Contribute" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/Contribute"
										? activeClasses
										: inactiveClasses
								} focus:${activeClasses.split(" ").join(" focus:")}`}
							>
								Contribute
							</a>
						</Link>
						<Link href="/More-Info">
							<a
								className={`${classes} ${
									router.pathname === "/More-Info" ||
									new URL(router.query.callbackUrl, "http://localhost:3000")
										.pathname == "/More-Info"
										? activeClasses
										: inactiveClasses
								} focus:${activeClasses.split(" ").join(" focus:")}`}
							>
								More Info
							</a>
						</Link>
					</nav>
					<div className="hidden pr-5 md:flex items-center justify-end md:flex-1 lg:w-0">
						{session?.status === "unauthenticated" ? (
							<Link href="/Help">
								<a className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 ring-1 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
									Help
									<svg
										className="ml-2 -mr-1 w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										></path>
									</svg>
								</a>
							</Link>
						) : (
							<>
								<Link href="/Account">
									<div className="rounded-full mt-1 h-9 border-2 hover:bg-green-400 border-opacity-30 hover:scale-110 hover:text-green-400">
										{!session?.data?.user?.image ? (
											<svg
												className="rounded-full dark:text-white hover:shadow-md float-left w-8 h-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
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
												src={session?.data?.user?.image}
											/>
										)}
									</div>
								</Link>
								<div className="mx-2 mb-2 h-8 dark:text-gray-300">
									<p className="text-sm">{session?.data?.user?.name}</p>
									<p className="text-xs">{session?.data?.user?.email}</p>
								</div>
								<button
									className="inline-block dark:text-white hover:text-green-400 p-1 h-8 text-sm hover:scale-105 duration-100"
									onClick={() => {
										signOut();
									}}
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										></path>
									</svg>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
			<div
				className={
					open
						? "opacity-100 block scale-100  ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
						: "opacity-0 scale-95 hidden absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
				}
			>
				<div className="rounded-lg shadow-lg border-2  dark:bg-gray-800 dark:text-white z-10 border-gray-700 ">
					<div className="mt-5 mx-7 flex items-center justify-between">
						<Link href="/">
							<div
								onClick={() => setOpen(!open)}
								className="flex justify-start items-center lg:w-0 lg:flex-1"
							>
								<Image src={logo} alt="" width="40" height="40" />

								<span className="ml-4 text-8-xl dark:text-white text-gray-600">
									<h1>Stats On Spotify</h1>
								</span>
							</div>
						</Link>
						<div className="mr-2">
							<button
								type="button"
								className="bg-white dark:text-white dark:bg-gray-800 rounded-xl inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
								onClick={() => setOpen(!open)}
							>
								<span className="sr-only">Close menu</span>
								{/* Heroicon name: outline/x */}
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div className="py-6 px-5 space-y-6 ">
						<div className="grid grid-cols-2 border-t-2 pt-5 gap-y-2 gap-x-8 border-b-2 border-gray-600 pb-5">
							<div className=" grid grid-cols-2 gap-y-5 gap-x-8 col-span-2 pl-2 pb-5 border-b-2 border-gray-600">
								<Link href="/Services">
									<a
										onClick={() => setOpen(!open)}
										className={`${classes} ${
											router.pathname === "/Services" ||
											new URL(router.query.callbackUrl, "http://localhost:3000")
												.pathname == "/Services"
												? activeClasses
												: inactiveClasses
										} focus:${activeClasses.split(" ").join(" focus:")}`}
									>
										Services
									</a>
								</Link>
								<Link href="/Blog">
									<a
										onClick={() => setOpen(!open)}
										className={`${classes} ${
											router.pathname === "/Blog" ||
											new URL(router.query.callbackUrl, "http://localhost:3000")
												.pathname == "/Blog"
												? activeClasses
												: inactiveClasses
										} focus:${activeClasses.split(" ").join(" focus:")}`}
									>
										Blog
									</a>
								</Link>
								<Link href="/Pricing">
									<a
										onClick={() => setOpen(!open)}
										className={`${classes} ${
											router.pathname === "/Pricing" ||
											new URL(router.query.callbackUrl, "http://localhost:3000")
												.pathname == "/Pricing"
												? activeClasses
												: inactiveClasses
										} focus:${activeClasses.split(" ").join(" focus:")}`}
									>
										Pricing
									</a>
								</Link>
								<Link href="/Account">
									<a
										onClick={() => setOpen(!open)}
										className={`${classes} ${
											router.pathname === "/Account" ||
											new URL(router.query.callbackUrl, "http://localhost:3000")
												.pathname == "/Account"
												? activeClasses
												: inactiveClasses
										} focus:${activeClasses.split(" ").join(" focus:")}`}
									>
										Account
									</a>
								</Link>
								<Link href="/Team">
									<a
										onClick={() => setOpen(!open)}
										className={`${classes} ${
											router.pathname === "/Team" ||
											new URL(router.query.callbackUrl, "http://localhost:3000")
												.pathname == "/Team"
												? activeClasses
												: inactiveClasses
										} focus:${activeClasses.split(" ").join(" focus:")}`}
									>
										Team
									</a>
								</Link>
								<Link href="/Contact">
									<a
										onClick={() => setOpen(!open)}
										className={`${classes} ${
											router.pathname === "/Contact" ||
											new URL(router.query.callbackUrl, "http://localhost:3000")
												.pathname == "/Contact"
												? activeClasses
												: inactiveClasses
										} focus:${activeClasses.split(" ").join(" focus:")}`}
									>
										Contact us
									</a>
								</Link>
							</div>
							<Link href="/Pentest/Web-Pentest">
								<li
									onClick={() => setOpen(!open)}
									className="block m-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Web Pentest
								</li>
							</Link>
							<Link href="/Pentest/Cloud-Pentest">
								<li
									onClick={() => setOpen(!open)}
									className="block m-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Cloud Pentest
								</li>
							</Link>{" "}
							<Link href="/Pentest/Network-Pentest">
								<li
									onClick={() => setOpen(!open)}
									className="block m-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Network Pentest
								</li>
							</Link>
							<Link href="/Pentest/Mobile-Pentest">
								<li
									onClick={() => setOpen(!open)}
									className="block m-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Mobile Pentest
								</li>
							</Link>
						</div>
					</div>
					<div className="mb-5 mx-7 flex items-center flex-row justify-start">
						{session ? (
							<>
								<Link href="/Account">
									<div
										onClick={() => setOpen(!open)}
										className="rounded-full mt-1 h-9"
									>
										{!session?.user?.image ? (
											<svg
												className="rounded-full dark:text-white hover:shadow-md float-left w-8 h-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
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
												src={session?.user?.image}
											/>
										)}
									</div>
								</Link>
								<div className="ml-2 mb-2 h-8">
									<p className="text-sm">{session?.user?.name}</p>
									<p className="text-xs">{session?.user?.email}</p>
								</div>
								<button
									className="inline-block mx-5  rounded-full border-2 px-2 p-1 h-8 text-sm hover:scale-105 duration-100"
									onClick={() => {
										signOut();
									}}
								>
									Logout
								</button>
							</>
						) : (
							<Link href="/auth/signIn">
								<a
									onClick={() => setOpen(!open)}
									className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 ring-1 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
								>
									Get started
									<svg
										className="ml-2 -mr-1 w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										></path>
									</svg>
								</a>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav;
