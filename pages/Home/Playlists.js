import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import UseSpotify from "../../hooks/UseSpotify";
import MyPlaylists from "../../components/MyPlaylists";
import Sidebar from "../../components/SideBar";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Playlists() {
	const [PlaylistsData, setPlaylistsData] = useState([]);
	const session = useSession();
	const spotifyApi = UseSpotify();
	// add user name here "9yo13loxl69oqp0hueroypa45"
	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi
				.getUserPlaylists("9yo13loxl69oqp0hueroypa45", { limit: 50 })
				.then(function (data) {
					setPlaylistsData(data.body);
				});
		}
	}, [session, spotifyApi]);

	return (
		<div>
			<Head>
				<title>My Playlists| Stats On Spotify</title>
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
							"linear-gradient( rgba(0 ,0, 0, 0.4), rgba(0,0,0,0.9)),url('https://images.unsplash.com/photo-1611172062211-3a3898a443fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHN0cmVhbSUyMG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
					className="bg-white min-h-[100vh] dark:bg-gray-900  flex flex-row flex-wrap
			items-center justify-center"
				>
					<Sidebar />
					<div className="relative md:ml-52 pt-3 h-screen">
						<div className="flex pt-10 items-center justify-center">
							<h1 className="text-4xl tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block dark:text-white sm:inline">My</span>
								<span className="block dark:text-green-400 xl:inline ml-3">
									Playlists
								</span>
							</h1>
						</div>
						<div className="flex flex-col p-10 items-center justify-center ">
							{" "}
							<MyPlaylists props={PlaylistsData} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
