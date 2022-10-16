import Head from 'next/head'
import Image from 'next/image'
import StatsBox from "../components/StatsBox";
import Sidebar from "../components/SideBar";
export default function Home() {
	return (
		<div>
			<Head>
				<title>Stats On Spotify</title>
				<meta
					name="description"
					content="Response with User data on Spotify."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="dark:bg-gray-800">
					<Sidebar />
					<div className="relative md:ml-64 pt-10 bg-gray-800 h-screen">
						<div className="flex pt-10 items-center justify-center">
							<h1 className="text-4xl tracking-tight text-left font-bold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block dark:text-white sm:inline">User</span>
								<span className="block dark:text-green-400 xl:inline ml-3">
									Dashboard
								</span>
							</h1>
						</div>
						<div className="flex flex-col p-10 items-center justify-center dark:bg-gray-800">
							<StatsBox />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
