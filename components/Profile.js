import Head from "next/head";
import Image from "next/image";
import { signOut, signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
function Profile() {
	const session = useSession();
	return (
		<div>
			<Head>
				<title>Profile | Stats On Spotify</title>
				<meta
					name="description"
					content="Response with User data on Spotify."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="dark:bg-gray-900">
					<div className="relative  pt-10 bg-gray-900 h-screen">
						<div className="flex pt-10 items-center justify-center">
							<h1 className="text-4xl tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block dark:text-white sm:inline">My</span>
								<span className="block dark:text-green-400 xl:inline ml-3">
									Profile
								</span>
							</h1>
						</div>
						<div className="flex flex-col p-10 items-center justify-center dark:bg-gray-900">
							<section className="bg-white dark:bg-gray-900">
								<div className="gap-5 items-center p-5 mx-auto max-w-screen-xl md:grid md:grid-cols-2 ">
									<div>
										{session?.data?.user?.image ? (
											<img
												className="w-25 h-25 rounded-full border-2"
												src={session?.data?.user?.image}
												alt={session?.data?.user?.name}
											/>
										) : (
											<img
												className="w-25 h-25 rounded-full border-2"
												src={session?.data?.user?.image}
												alt={session?.data?.user?.name}
											/>
										)}
									</div>

									<div className="mt-4 md:mt-0">
										{session?.data?.user?.name ? (
											<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
												{session?.data?.user?.name}
											</h2>
										) : (
											<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
												User Name
											</h2>
										)}
										{session?.data?.user?.name ? (
											<h2 className="mb-6  text-2xl  text-gray-500  dark:text-gray-400">
												{session?.data?.user?.email}
											</h2>
										) : (
											<h2 className="mb-6  text-2xl  text-gray-500  dark:text-gray-400">
												User Email
											</h2>
										)}
										<div className="flex justify-start  items-center">
											<span className="text-2xl font-bold text-grey-400 dark:text-white">
												Membership :
											</span>
											<span className=" m-1 text-2xl font-bold dark:text-green-400">
												Free
											</span>
										</div>
										{!session ? (
											<a
												onClick={() => signOut()}
												className="inline-flex items-center p-5 my-5 text-white dark:bg-gray-700 dark:hover:bg-ingigo-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:focus:ring-primary-900"
											>
												LogIn
												<svg
													className="ml-2 -mr-1 w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill-rule="evenodd"
														d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
														clip-rule="evenodd"
													></path>
												</svg>
											</a>
										) : (
											<a
												onClick={() => signIn("google")}
												className="inline-flex items-center p-5 my-5 text-white dark:bg-gray-700 dark:hover:bg-ingigo-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:focus:ring-primary-900"
											>
												Logout
												<svg
													className="ml-2 -mr-1 w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill-rule="evenodd"
														d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
														clip-rule="evenodd"
													></path>
												</svg>
											</a>
										)}
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Profile;
