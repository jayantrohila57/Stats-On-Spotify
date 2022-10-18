import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import UseSpotify from "../../hooks/UseSpotify";
import TopTracksList from "../../components/TopTracksList";
import Sidebar from "../../components/SideBar";
import { useSession, signIn, signOut } from "next-auth/react";
export default function TopTrack() {
	const [Tracks, setTracks] = useState([]);
	const session = useSession();
	const spotifyApi = UseSpotify();
	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getMyTopTracks().then(function (data) {
				setTracks(data.body.items);
			});
		}
	}, [session, spotifyApi]);
	return (
		<div>
			<Head>
				<title>Top Tracks | Stats On Spotify</title>
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
							"linear-gradient( rgba(0 ,0, 0, 0.2), rgba(0,0,0,0.4)),url('https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BvdGlmeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
					className="bg-white min-h-[100vh] dark:bg-gray-900  flex flex-row flex-wrap
			items-center justify-center"
				>
					<Sidebar />
					<div className="relative md:ml-48 pt-3 h-screen">
						<div className="flex pt-10 items-center justify-center">
							<h1 className="text-4xl tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block dark:text-white sm:inline">Top</span>
								<span className="block dark:text-green-400 xl:inline ml-3">
									Tracks
								</span>
							</h1>
						</div>
						<div className="flex flex-col p-10 items-center justify-center ">
							{" "}
							<TopTracksList props={Tracks} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
