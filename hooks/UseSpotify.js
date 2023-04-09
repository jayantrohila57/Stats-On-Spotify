import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'
// import spotifyApi from '../lib/spotify'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

function useSpotify() {
  const { data: session } = useSession()
  // console.log("useSpotify session: ", session)

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        console.log('manual sign in')
        signOut()
      }
      //setting the acces token that will be used by the api through the build
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
