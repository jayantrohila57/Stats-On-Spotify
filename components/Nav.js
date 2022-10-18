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
		<div className="px-5 fixed w-screen backdrop-blur-md rounded-lg duration-300 z-10">
			<div>
				<div className="flex justify-between items-center  py-3 md:justify-start md:space-x-5">
					<Link href="/">
						<div className="flex  justify-start items-center lg:w-0 lg:flex-1">
							<span className="font-bold text-2xl  dark:text-white text-gray-600">
								<h1>Stats On Spotify</h1>
							</span>
						</div>
					</Link>
					<div className="-my-2 md:hidden">
						<button
							type="button"
							className="rounded-xl p-2 dark:text-white inline-flex items-center justify-center text-gray-400"
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
			{/* Mobile Nav Bar */}
			<div
				className={
					open
						? "block  absolute top-0 inset-x-0  origin-top-right md:hidden"
						: "opacity-0 hidden absolute top-0 inset-x-0 origin-top-right md:hidden"
				}
			>
				<div className="h-screen z-10 ">
					<div className="shadow-lg h-full bg-gray-900 bg-opacity-90  text-white duration-300 font-bold ">
						<div className="p-3 flex items-center justify-between">
							<Link href="/">
								<div
									onClick={() => setOpen(!open)}
									className="flex p-1 justify-start items-center lg:w-0 lg:flex-1"
								>
									<span className="text-2xl dark:text-white text-gray-600">
										<h1>Stats On Spotify</h1>
									</span>
								</div>
							</Link>
							<div>
								<button
									type="button"
									className="text-white font-bold pr-4 inline-flex items-center justify-center"
									onClick={() => setOpen(!open)}
								>
									<svg
										className="h-8 w-8"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={3}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div className="h-full pb-10 flex flex-col justify-center">
							<div className="flex flex-col items-start p-1 justify-center">
								<hi className="mx-5 font-extrabold border-b-2 border-dashed w-72 text-3xl text-green-400">
									Menu
								</hi>
								<Link href="/Home">
									<h1
										onClick={() => setOpen(!open)}
										className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
									>
										Go to Home
									</h1>
								</Link>
								<Link href="/Account">
									<h1
										onClick={() => setOpen(!open)}
										className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
									>
										My Account
									</h1>
								</Link>
								<Link href="/Contribution">
									<h1
										onClick={() => setOpen(!open)}
										className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
									>
										Contribution
									</h1>
								</Link>
								<Link href="/More-Info">
									<h1
										onClick={() => setOpen(!open)}
										className="duration-300 hover:text-green-400 rounded-3xl hover:p-4 my-2 m-1 p-3 text-5xl"
									>
										More Info
									</h1>
								</Link>
							</div>
							<div className="flex pb-10 items-center p-1 justify-evenly ">
								{session?.status === "unauthenticated" ? (
									<button
										onClick={() => {
											signIn("spotify");
										}}
										className="bg-black m-5 px-2 py-3 w-full rounded-xl mt-5 flex justify-center items-center text-lg hover:scale-105 duration-300 text-green-400"
									>
										Login with Spotify
									</button>
								) : (
									<>
										<Link href="/Account">
											<div className="rounded-3xl m-2 h-20  hover:bg-green-400 border-opacity-20 hover:scale-110 hover:text-green-400">
												<img
													className="rounded-3xl hover:shadow-md float-left h-full"
													src={session?.data?.user?.image}
												/>
											</div>
										</Link>
										<div className="p-1 dark:text-gray-300">
											<p className="text-2xl text-green-400">
												{session?.data?.user?.name}
											</p>
											<p className="text-lg truncate">
												{session?.data?.user?.email}
											</p>
										</div>
										<button
											className="inline-block dark:text-white hover:text-green-400 p-1 h-8 text-sm hover:scale-105 duration-100"
											onClick={() => {
												signOut();
											}}
										>
											<svg
												className="w-8 h-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="3"
													d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
												></path>
											</svg>
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav;
