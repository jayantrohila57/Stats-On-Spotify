import { signIn, getSession } from "next-auth/react";
import Head from "next/head";

const SignIn = () => {
	return (
		<>
			<Head>
				<title>Voltsec.io | Signin </title>
				<meta name="description" content="Full-Pentest" />
			</Head>
			<section className="bg-white dark:bg-gray-900 ">
				<div className="flex flex-row flex-wrap justify-center items-center min-h-screen">
					<div className="block m-2 p-6 max-w-md dark:text-white bg-white rounded-lg  dark:bg-gray-800 dark:border-gray-700">
						<div className="text-center pr-2 m-5">
							<h2 className="font-bold text-3xl p-2 "> SignUp / LogIn </h2>

							<button
								onClick={() => {
									signIn();
								}}
								className="bg-gray-100  border px-3 py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
							>
								Login with Spotify
							</button>
						</div>
						<div className="p-5 ">
							{" "}
							<p className="m-2 text-xs text-gray-600 dark:text-white text-center">
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
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
SignIn.getInitialProps = async (context) => {
	const { req, res, query } = context;
	const session = await getSession({ req });
	if (session && res && session.accessToken) {
		res.writeHead(302, { Location: query.callbackUrl || "/" });
		res.end();
		return {};
	}
	return {
		session: null,
	};
};

export default SignIn;
