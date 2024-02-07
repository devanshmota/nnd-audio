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

const RecentlyPlayed = () => {

  const { language } = useSelector((state) => state.language)
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  useEffect(() => {

    getRecentlyPlayedMusicApi({
      onSuccess: (res) => {
        setRecentlyPlayed(res.music.slice(0, 3))
      },
      onError: (e) => {
        console.log(e)
      }
    })
  }, [])


  return (
    <>
      <div className="container d-flex justify-content-between align-items-center my-4">
        <h2 className="text-white m-0">Recently Played</h2>
        <Link href='recently-played-all' className='view_all'>View all</Link>
      </div>
      <div className="container">
        <div className="row gap-4">

          {
            recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (
             
                <div key={index} className="col-lg-12">
                  <div className="d-flex align-items-center justify-content-between text-white">
                    <div className="d-flex align-items-center gap-3">
                      <Image src={item.album.image} alt={item.eng_title} className="rounded" width={120} height={120} />
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
      <br />
      <br />
    </>
  )
}

export default RecentlyPlayed