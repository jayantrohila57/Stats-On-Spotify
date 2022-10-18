import Head from "next/head";
import Image from "next/image";
import StatsBox from "../../components/StatsBox";
import Sidebar from "../../components/SideBar";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
	const session = useSession();
	return (
		<div>
			<Head>
				<title>Home | Stats On Spotify</title>
				<meta
					name="description"
					content="Response with User data on Spotify."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div
					style={{
						backgroundImage:
							"linear-gradient( rgba(0 ,0, 0, 0.2), rgba(0,0,0,0.9)),url('https://images.unsplash.com/photo-1623018035813-9cfb5b502e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
						backgroundSize: 'cover"',
						backgroundPosition: "center",

						backgroundRepeat: "no-repeat",
					}}
					className="bg-white min-h-[100vh] dark:bg-gray-900  flex flex-row flex-wrap
			items-center justify-center"
				>
					<Sidebar />
					<div className="relative md:ml-64 pt-10 bg-gray-900 h-screen">
						<div className="flex pt-10 items-center justify-center">
							<h1 className="text-4xl tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block dark:text-white sm:inline">
									{session?.data?.user?.name}'s
								</span>
								<span className="block dark:text-green-400 xl:inline ml-3">
									Stats
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
