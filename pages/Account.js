import Head from "next/head";
import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useSession } from "next-auth/react";
import UseSpotify from "../hooks/UseSpotify";
function Account() {
	const [Data, setData] = useState([]);
	const session = useSession();
	const spotifyApi = UseSpotify();
	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getMe().then(function (data) {
				setData(data.body);
			});
		}
	}, [session, spotifyApi]);
	return (
		<div>
			<Head>
				<title>Account | Stats On Spotify</title>
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
							"linear-gradient( rgba(0 ,0, 0, 0.1), rgba(0, 0, 0,0.9)),url('https://images.unsplash.com/photo-1581315628079-f093bb040803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
					className="bg-white  dark:bg-gray-900  flex flex-row flex-wrap
			items-center justify-center"
				>
					<div className="h-screen flex flex-col items-center justify-around ">
						<div className="pt-10 flex items-center justify-center">
							<h1 className="text-4xl tracking-tight text-center font-bold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block dark:text-white sm:inline">My</span>
								<span className="block dark:text-green-400 xl:inline ml-3">
									Profile
								</span>
							</h1>
						</div>
						<div className="flex flex-col pb-10 items-center justify-center ">
							<Profile props={Data} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Account;
