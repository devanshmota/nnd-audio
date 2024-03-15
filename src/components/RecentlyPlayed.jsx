'use client'
import { getRecentlyPlayedMusicApi } from "@/redux/actions/Campaign";
import Image from "next/image"
import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import GetLanguage from "./GetLanguage";
import GetCatLanguage from "./GetCatLanguage";
import OffCanvas from "./OffCanvas";
import { FaHeart } from "react-icons/fa";
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loader from "./Loader";
import CategoryHeader from "./CategoryHeader";
import heartFilled from '../../public/nnd/heart_Fill.svg'
import heartIcon from '../../public/nnd/Heart_stork.svg'
import shareIcon from '../../public/nnd/song_Share.svg'


const RecentlyPlayed = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const { language } = useSelector((state) => state.language)
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false)
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const token = users?.users?.token


  useEffect(() => {
    if (token) {
      getRecentlyPlayedMusicApi({
        onSuccess: (res) => {
          if (res.music) {
            setRecentlyPlayed(res.music.slice(0, 9))
          }
          setIsLoading(false)
        },
        onError: (e) => {
          console.log(e)
          setIsLoading(false)
        }
      })
    }
    setIsLoading(false)
  }, [token, isLiked])


  const handleSave = (musicId) => {
    setSelectedMusicId(musicId);
    setIsOffCanvasOpen(true)
  }

  if (isLoading) {
    return <Loader />
  }

  if (recentlyPlayed?.length === 0 || !token) {
    return null
  }

  const handlePlayMusic = (musicId) => {
    const index = recentlyPlayed.findIndex((item) => item.id === musicId);
    dispatch(setMusicPlaylist(recentlyPlayed))
    dispatch(setCurrentTrack(index))
    dispatch(setIsPlaying(true))
  };

  const copyToClip = async () => {
    await navigator.clipboard.writeText(location.href)
    toast.success(t('Link copied to clipboard'))
  }

  return (
    <>
      <div className="container">
        <CategoryHeader
          title="Recently Played"
          link="/recently-played-all"
          isShow={recentlyPlayed.length > 8}
        />
        <div className="row gy-4 utsav_gap">
          {
            recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (
              <div key={item.id} className="col-xxl-4 col-lg-6">
                <div className="d-flex align-items-center justify-content-between text-white music_card">
                  <div onClick={() => handlePlayMusic(item.id)} className="d-flex align-items-center gap-3 cursor-pointer">
                    <Image src={item.album.image} alt={item.eng_title} className="rounded" width={80} height={80} />
                    <div className="d-flex flex-column gap-2">
                      <h5 className="m-0 text-break title_rcnt_plyd">{GetLanguage(language, item)}</h5>
                      <p className="text-rec-pld desc_rcnt_plyd">{GetCatLanguage(language, item)}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 gap-md-3">
                    <Image src={shareIcon} width={24} height={24} className="icon_recent_plyd" onClick={copyToClip} />
                    {token && (
                      <>
                        {item.playlist.length > 0 ? (
                          <Image src={heartFilled} className="icon_recent_plyd" onClick={() => handleSave(item.id)} width={24} height={24} />
                        ) : (
                          <Image src={heartIcon} className="icon_recent_plyd" onClick={() => handleSave(item.id)} width={24} height={24} />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
      </div>
    </>
  )
}

export default withTranslation()(RecentlyPlayed)