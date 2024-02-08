'use client'
import { getRecentlyPlayedMusicApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaDownload, FaRegHeart, FaShareAlt } from "react-icons/fa"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import GetCatLanguage from "./GetCatLanguage"

const AllRecentlyPlayed = () => {

  const { language } = useSelector((state) => state.language)
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  useEffect(() => {

    getRecentlyPlayedMusicApi({
      onSuccess: (res) => {
        setRecentlyPlayed(res.music)
      },
      onError: (e) => {
        console.log(e)
      }
    })
  }, [])

  return (
    <div className="container text-white">
      <div className="row">
        {recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (
          <div key={index} className="col-lg-6 mus_cat_container">
            <div className="d-flex align-items-center justify-content-between text-white">
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
                <FaRegHeart className="icon_recent_plyd" />
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default AllRecentlyPlayed