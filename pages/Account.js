import React, { useEffect, useState } from 'react'
import UseSpotify from '../hooks/UseSpotify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Profile from '../components/Profile'
function Account() {
  const spotifyApi = UseSpotify()
  const session = useSession()
  const router = useRouter()
  const [Data, setData] = useState([])
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMe().then(function (data) {
        setData(data.body)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, spotifyApi])

  if (session.status === 'unauthenticated') {
    router.push('/')
  } else {
    return (
      <>
        <Profile props={Data} />
      </>
    )
  }
}

export default Account
