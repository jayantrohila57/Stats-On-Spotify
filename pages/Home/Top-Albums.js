import Head from "next/head";
import Image from "next/image";
import StatsBox from "../../components/StatsBox";
import Sidebar from "../../components/SideBar";
import { useSession, signIn, signOut } from "next-auth/react";
export default function TopAlbums() {
	const { session } = useSession();
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
				<div className="dark:bg-gray-900">
					<Sidebar />
					<div className="relative md:ml-64 pt-10 bg-gray-900 h-screen">
						<div className="flex pt-10 items-center justify-center">
							<h1 className="text-4xl tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block dark:text-white sm:inline">Top</span>
								<span className="block dark:text-green-400 xl:inline ml-3">
									Albums
								</span>
							</h1>
						</div>
						<div className="flex flex-col p-10 items-center justify-center dark:bg-gray-900">
							<StatsBox />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
