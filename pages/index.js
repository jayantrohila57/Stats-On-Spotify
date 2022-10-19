import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
function Hero() {
	const session = useSession()
	return (
		<div>
			<Head>
				<title>Stats On Spotify </title>
				<meta
					name="description"
					content="Response with User data on Spotify."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section
				style={{
					backgroundImage:
						"linear-gradient( rgba(0 ,0, 0, 0.2), rgba(0,0,0,0.8)),url('https://images.unsplash.com/photo-1623018035813-9cfb5b502e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
					backgroundSize: 'cover"',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
				className="bg-white min-h-[100vh] dark:bg-gray-900  flex flex-row flex-wrap
			items-center justify-center"
			>
				<div className="flex flex-row flex-wrap mt-10 items-center content-center justify-center">
					<div className="sm:text-left lg:text-left">
						<div className="p-5">
							<h1 className="tracking-tight text-left font-bold text-gray-900  ">
								<span className="block dark:text-white sm:inline text-5xl md:text-8xl">
									Welcome to
									<br />
								</span>

								<span className="block dark:text-green-400 sm:inline text-5xl md:text-8xl">
									Stats On Spotify
								</span>
							</h1>
						</div>
						<div className="px-5">
							<h1 className="text-xl tracking-tight text-left font-bold text-gray-900 sm:text-5xl md:text-5xl">
								<span className="block dark:text-gray-300 xl:inline">
									An Easy Approach To
									<br /> Review Your Spotify Data
								</span>
							</h1>
						</div>
					</div>
				</div>
				<div className="flex flex-col m-2  sm:flex-col sm:justify-center  sm:space-x-4">
					<div className="flex flex-row flex-wrap justify-center items-center">
						<div className="block m-1 p-2 max-w-sm dark:text-white shadow-2xl rounded-2xl bg-gray-200 bg-opacity-10 backdrop-blur-md ">
							<div className="text-center pr-2 ">
								{session?.status === 'unauthenticated' ? (
									<h2 className="font-bold text-3xl p-5 ">SignUp / LogIn</h2>
								) : (
									<h2 className="font-bold text-3xl p-5 ">
										Welcome {session?.data?.user?.name}
									</h2>
								)}
								{session?.status === 'unauthenticated' ? (
									<button
										onClick={() => {
											signIn('spotify')
										}}
										className="bg-black px-2 py-3 w-full rounded-xl mt-5 flex justify-center items-center text-lg hover:scale-105 duration-300 text-green-400"
									>
										Login with Spotify
									</button>
								) : (
									<Link href="/Home">
										<button className="bg-black px-2 py-3 w-full rounded-xl mt-5 flex justify-center items-center text-lg hover:scale-105 duration-300 text-green-400">
											Get Started
											<svg
												className="ml-2 w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M14 5l7 7m0 0l-7 7m7-7H3"
												/>
											</svg>
										</button>
									</Link>
								)}
								{session?.status === 'unauthenticated' ? (
									<p className="m-2 pt-5 text-xs text-gray-600 dark:text-white text-center">
										By signing in I agree to
										<a
											href="#"
											className="m-1 border-b border-gray-500 border-dotted"
										>
											Terms of Service
										</a>
										and its
										<a
											href="#"
											className="ml-1 border-b border-gray-500 border-dotted"
										>
											Privacy Policy
										</a>
									</p>
								) : (
									<p className="m-2 pt-5 text-xs text-gray-600 dark:text-white text-center">
										Let's Explore Your Playlist, Songs, Artists and manage them
										efficently.{' '}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Hero
