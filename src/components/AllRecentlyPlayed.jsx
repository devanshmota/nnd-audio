'use client'
import { getRecentlyPlayedMusicApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaDownload, FaRegHeart, FaShareAlt } from "react-icons/fa"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import GetCatLanguage from "./GetCatLanguage"
import { FaHeart } from "react-icons/fa";
import OffCanvas from "./OffCanvas"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import BreadCrumb from "./BreadCrumb"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const AllRecentlyPlayed = () => {

  const { language } = useSelector((state) => state.language)
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecentlyPlayedMusicApi({
      onSuccess: (res) => {
        if (res.music) {
          setRecentlyPlayed(res.music)
        }
        setIsLoading(false)
      },
      onError: (e) => {
        console.log(e)
        setIsLoading(false)
      }
    })
  }, [isLiked, selectedMusicId])

  const handleSave = (musicId) => {
    setSelectedMusicId(musicId);
    setIsOffCanvasOpen(true)
  }

  return (
    <div className="container text-white">
      <div className="row mt-4">
        {isLoading &&
          <div className='d-flex align-items-center justify-content-center py-2'>
            <ClipLoader color="#ffffff" />
          </div>
        }
        <BreadCrumb title={t('Recently Played')}/>
        {recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (
          <div key={index} className="col-lg-6 mt-4">
            <div className="d-flex align-items-center justify-content-between text-white music_card">
              <div className="d-flex align-items-center gap-3">
                <Image src={item.album.image} alt={item.eng_title} className="rounded" width={80} height={80} />
                <div className="d-flex flex-column gap-2">
                  <h5 className="m-0 text-break title_rcnt_plyd">{GetLanguage(language, item)}</h5>
                  <p className="text-rec-pld desc_rcnt_plyd">{GetCatLanguage(language, item)}</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 gap-md-3">
                <FaShareAlt className="icon_recent_plyd" />
                <FaDownload className="icon_recent_plyd" />



                {
                  item.playlist.length > 0 ? (
                    <FaHeart className="icon_recent_plyd liked_rcnt" onClick={() => handleSave(item.id)} />
                  )
                    :
                    (
                      <FaRegHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                    )
                }
              </div>
            </div>
          </div>
        ))
        }
      </div>
      {
        !isLoading && recentlyPlayed.length === 0 && <Nodataviewall />
      }
      <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
    </div>
  )
}

export default withTranslation()(AllRecentlyPlayed)