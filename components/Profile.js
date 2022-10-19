import Head from "next/head";
import { signOut, signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
function Profile(Data) {
	const session = useSession();
	const user = Data.props;

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
        <section className="p-2 pb-10 flex flex-row flex-wrap rounded-3xl bg-gray-500 bg-opacity-5 backdrop-blur-md break-words shadow-2xl md:max-w-full max-w-xs text-white">
          <div className="items-center p-2 mx-auto ">
            <div>
              {session?.data?.user?.image ? (
                <img
                  className="hover:p-3 duration-300 shadow-2xl w-72 h-72 md:w-64 md:h-64 rounded-3xl border-1"
                  src={session?.data?.user?.image}
                  alt={session?.data?.user?.name}
                />
              ) : (
                <img
                  className="w-48 h-w-48 rounded-full border-2"
                  src={session?.data?.user?.image}
                  alt={session?.data?.user?.name}
                />
              )}
            </div>
            <div>
              <button
                onClick={() => signOut()}
                className="bg-black px-2 py-3 w-full rounded-xl mt-5 flex justify-center items-center text-lg hover:scale-105 duration-300 text-green-400"
              >
                Logout
                <svg
                  className="m-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-around m-2">
            <div className="flex flex-row">
              <h2 className="md:text-2xl pb-2 hover:py-1 hover:text-green-600 duration-300 text-xl lg:text-3xl font-bold text-green-400 ">
                Name
              </h2>
              <h2 className="ml-5 md:text-2xl text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {session?.data?.user?.name}
              </h2>
            </div>
            <div className="flex flex-row">
              <h2 className="md:text-2xl pb-2 hover:py-1 hover:text-green-600 duration-300 text-xl lg:text-3xl font-bold text-green-400 ">
                Email
              </h2>
              <h2 className="ml-5 md:text-2xl truncate text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {user?.email}
              </h2>
            </div>
            <div className="flex flex-row">
              <h2 className="md:text-2xl pb-2 hover:py-1 hover:text-green-600 duration-300 text-xl lg:text-3xl font-bold text-green-400 ">
                Followers
              </h2>
              <h2 className="ml-5 md:text-2xl text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {user?.followers?.total}
              </h2>
            </div>

            <div className="flex flex-row">
              <h2 className="md:text-2xl pb-2 hover:py-1 hover:text-green-600 duration-300 text-xl lg:text-3xl font-bold text-green-400 ">
                Country
              </h2>
              <h2 className="ml-5 md:text-2xl text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {user?.country}
              </h2>
            </div>
            <div className="flex flex-row">
              <h2 className="md:text-2xl pb-2 hover:py-1 hover:text-green-600 duration-300 text-xl lg:text-3xl font-bold text-green-400 ">
                Product
              </h2>
              <h2 className="ml-5 md:text-2xl text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {user?.product}
              </h2>
            </div>
            <div className="flex flex-row">
              <h2 className="md:text-2xl pb-2 hover:py-1 hover:text-green-600 duration-300 text-xl lg:text-3xl font-bold text-green-400 ">
                Explicit Content
              </h2>
              <h2 className="ml-5 md:text-2xl text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {user?.explicit_content?.filter_enabled == 'filter_enabled' ? (
                  <p>Enabled</p>
                ) : (
                  <p>Disabled</p>
                )}
              </h2>
            </div>
            <div className="flex flex-row">
              <h2 className="md:text-2xl pb-2 hover:py-1 hover:text-green-600 duration-300 text-xl lg:text-3xl font-bold text-green-400 ">
                Explicit Filter
              </h2>
              <h2 className="ml-5 md:text-2xl text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {user?.explicit_content?.filter_enabled == 'filter_locked' ? (
                  <p>Enabled</p>
                ) : (
                  <p>Disabled</p>
                )}
              </h2>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile;
