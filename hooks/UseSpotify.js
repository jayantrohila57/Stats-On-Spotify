import { useCallback, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'
import spotifyApi from '../lib/spotify'
function useSpotify() {
	const session = useSession()
	const { data } = useSession()
	useEffect(() => {
		if (
			session.status === 'unauthenticated' ||
			session.error === 'RefreshAccessTokenError'
		) {
			signIn('spotify')
		}
		if (session.status === 'authenticated') {
			if (data?.accessToken) {
				spotifyApi.setAccessToken(data?.accessToken)
				// console.log("Token Recieved", data?.accessToken);
			}
		}
	}, [session])
	return spotifyApi
}

export default useSpotify
