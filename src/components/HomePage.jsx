'use client'
import 'swiper/css';
import 'swiper/css/navigation';
import MusicCategories from './MusicCategories';
import Utsav from './Utsav';
import Artists from './Artists';
import Lyricists from './Lyricists';
import Radio from './Radio';
import RecentlyPlayed from "./RecentlyPlayed";
import LiveKathaStream from "./LiveKathaStream";
import LatestAlbums from "./LatestAlbums";
import { useState } from 'react';
import { useEffect } from 'react';
import { getHomeApi } from '@/redux/actions/Campaign';
import Loader from './Loader';

const HomePage = () => {
  const [Home, setHome] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getHomeApi({
      is_guest: 1,
      onSuccess: (res) => {
        if (res) {
          setHome(res)
        }
        setIsLoading(false)
      },
      onError: (e) => {
        console.log(e)
        setIsLoading(false)
      }
    })
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className='d-flex flex-column gap-5 mt-3'>
        {Home?.youtube_live?.length > 0 && (
          <LiveKathaStream liveKathaStream={Home.youtube_live} />
        )}

        {
          Home?.category?.length > 0 && (
            <MusicCategories musicCategory={Home.category} />
          )
        }
        {
          Home?.recent_album?.length > 0 && (
            <LatestAlbums LatestAlbums={Home.recent_album} />
          )
        }
        {
          Home?.utsav?.length > 0 && (
            <Utsav utsav={Home.utsav} />
          )
        }

        {
          Home?.artist?.length > 0 && (
            <Artists artists={Home.artist} />
          )
        }

        {
          Home?.lyricist?.length > 0 && (
            <Lyricists lyricists={Home.lyricist} />
          )
        }

        {
          Home?.radio?.length > 0 && (
            <Radio radio={Home.radio} />
          )
        }
        <RecentlyPlayed />
      </div>
    </>
  )
}
export default HomePage
