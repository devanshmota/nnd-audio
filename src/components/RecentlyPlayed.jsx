'use client'
import { getRecentlyPlayedMusicApi } from "@/redux/actions/Campaign";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OffCanvas from "./OffCanvas";
import { withTranslation } from "react-i18next";
import Loader from "./Loader";
import CategoryHeader from "./CategoryHeader";
import SongCard from "./SongCard";


const RecentlyPlayed = () => {

  const users = useSelector((state) => state.users)
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

  return (
    <>
      <div className="container">
        <CategoryHeader
          title="Recently Played"
          link="/recently-played"
          isShow={recentlyPlayed.length > 8}
        />
        <div className="row song_gap">
          <SongCard data={recentlyPlayed} handleSave={handleSave} />
        </div>

        <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
      </div>
    </>
  )
}

export default withTranslation()(RecentlyPlayed)