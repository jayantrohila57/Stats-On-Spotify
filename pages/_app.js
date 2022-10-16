import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Nav from "../components/Nav";
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<header className="dark:bg-gray-800">
				<Nav />
			</header>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
