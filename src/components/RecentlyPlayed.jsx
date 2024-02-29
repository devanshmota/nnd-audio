'use client'
import { getRecentlyPlayedMusicApi } from "@/redux/actions/Campaign";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import GetLanguage from "./GetLanguage";
import GetCatLanguage from "./GetCatLanguage";
import OffCanvas from "./OffCanvas";
import { FaHeart } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Nodatafound from "./Nodatafound";

const RecentlyPlayed = () => {

  const users = useSelector((state) => state.users)
  const { language } = useSelector((state) => state.language)
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    getRecentlyPlayedMusicApi({
      onSuccess: (res) => {
        if (res.music) {
          setRecentlyPlayed(res.music.slice(0, 6))
        }
        setIsLoading(false)
      },
      onError: (e) => {
        console.log(e)
        setIsLoading(false);
      }
    })
  }, [isLiked, selectedMusicId])

  const handleSave = (musicId) => {
    setSelectedMusicId(musicId);
    setIsOffCanvasOpen(true)
  }

  const token = users?.users?.token

  if (recentlyPlayed.length === 0 || !token) {
    return null
  }

  return (
    <>
      <div className="container d-flex justify-content-between align-items-center my-4">
        <h2 className="text-white m-0">Recently Played</h2>
        <Link href='recently-played-all' className='view_all'>View all</Link>
      </div>
      <div className="container">
        <div className="row gy-4">
          {isLoading &&
            <div className='d-flex align-items-center justify-content-center py-2'>
              <ClipLoader color="#ffffff" />
            </div>
          }
          {
            recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (

              <>
                <div className="col-lg-6">
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
                          <FaHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                        )
                          :
                          (
                            <FaRegHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                          )
                      }
                    </div>
                  </div>
                </div>

                    
                <div key={index} className="col-lg-6">
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
                          <FaHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                        )
                          :
                          (
                            <FaRegHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                          )
                      }
                    </div>
                  </div>
                </div>
           </>
            ))
          }

        </div>
        <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
      </div>
      <br />
      <br />
    </>
  )
}

export default RecentlyPlayed