import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import UseSpotify from '../hooks/UseSpotify'
import NewItems from '../components/NewItems'
import MyPlaylists from '../components/MyPlaylists'
import Profile from '../components/Profile'
import TopArtistisList from '../components/TopArtistisList'
import TopTracksList from '../components/TopTracksList'
import NavRouter from '../components/NavRouter'
import Hero from '../components/Hero'
import InfoSection from '../components/InfoSection'

export default function Home() {
  const spotifyApi = UseSpotify()
  const session = useSession()
  const [Data, setData] = useState([])
  const [TopArtists, setTopArtists] = useState([])
  const [NewReleases, setNewReleases] = useState([])
  const [PlaylistsData, setPlaylistsData] = useState([])
  const [Tracks, setTracks] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getNewReleases({ limit: 50, offset: 0 }).then(function (data) {
        setNewReleases(data.body.albums.items)
      })
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMe().then(function (data) {
        setData(data.body)
      })
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists(Data?.user?.id, { limit: 50, offset: 0 })
        .then(function (data) {
          setPlaylistsData(data.body)
        })
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopArtists({ limit: 50, offset: 0 })
        .then(function (data) {
          setTopArtists(data.body.items)
          // console.log(data.body.items)
        })
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks({ limit: 50, offset: 0 }).then(function (data) {
        setTracks(data.body.items)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, spotifyApi])

  return (
    <div className="flex flex-col  bg-black">
      <div className="h-screen scrollbar-thin scrollbar-thumb-gray-700 duration-300 snap-y snap-mandatory scroll-smooth scrollbar-track-gray-300 overflow-y-scroll dark:scrollbar-thumb-green-900 dark:scrollbar-track-black">
        <div className="snap-center snap-normal">
          <Hero />
        </div>{' '}
        <div className="snap-center snap-normal">
          <Profile props={Data} />
        </div>{' '}
        <div className="snap-center snap-normal">
          <InfoSection />
        </div>{' '}
        <div className="flex snap-end flex-col md:flex-row">
          <div className="bg-black w-10/12 h-1/6 md:w-1/5 md:h-screen">
            <NavRouter name="Your Top #50 Songs That You Listen the most." />
          </div>
          <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-5/6">
            <TopTracksList props={Tracks} />
          </div>
        </div>
        <div className="flex  snap-end flex-col md:flex-row">
          <div className="bg-black w-10/12 h-1/6 md:w-1/5 md:h-screen">
            <NavRouter name="Your Top #50 Artists That You Listen the most." />
          </div>
          <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-5/6">
            <TopArtistisList props={TopArtists} />
          </div>
        </div>
        <div className="flex  snap-end flex-col md:flex-row">
          <div className="bg-black w-10/12 h-1/6 md:w-1/5 md:h-screen">
            <NavRouter name="All Of Your Playlists are Here Check Them Out." />
          </div>
          <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-5/6">
            <MyPlaylists props={PlaylistsData} />
          </div>
        </div>
        <div className="flex  snap-end flex-col md:flex-row">
          <div className="bg-black w-10/12 h-1/6 md:w-1/5 md:h-screen">
            <NavRouter name="New Release that we hope you like them." />
          </div>
          <div className="flex flex-col items-center justify-center w-12/12 h-4/6 md:w-5/6">
            <NewItems props={NewReleases} />
          </div>
        </div>
      </div>{' '}
    </div>
  )
}
