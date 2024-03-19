'use client'
import { getRecentlyPlayedMusicApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import OffCanvas from "./OffCanvas"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import BreadCrumb from "./BreadCrumb"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import Pagination from './ReactPagination.jsx'
import SongCard from "./SongCard"

const AllRecentlyPlayed = () => {

  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [total, setTotal] = useState(0);
  const [offsetdata, setOffsetdata] = useState(0);
  const limit = 18;

  useEffect(() => {

    getRecentlyPlayedMusicApi({
      offset: offsetdata,
      limit: limit,
      onSuccess: (res) => {
        if (res.music) {
          setRecentlyPlayed(res.music)
        }
        setTotal(res.music.length)
        setIsLoading(false)
      },
      onError: (e) => {
        console.log(e)
        setIsLoading(false)
      }
    })
  }, [isLiked, selectedMusicId, offsetdata])

  const handlePageChange = (selectedPage) => {
    const newOffset = selectedPage.selected * limit;
    setOffsetdata(newOffset);
    window.scrollTo(0, 0);
  };

  const handleSave = (musicId) => {
    setSelectedMusicId(musicId);
    setIsOffCanvasOpen(true)
  }


  return (
    <div className="container text-white mt-5">
  
        {isLoading &&
          <div className='d-flex align-items-center justify-content-center py-2'>
            <ClipLoader color="#ffffff" />
          </div>
        }
        <BreadCrumb title={t('Recently Played')} />

        <div className="row mt-5">
          <SongCard data={recentlyPlayed} handleSave={handleSave} />
        </div>
     
      {
        total > 18 && recentlyPlayed.length > 0 && (
          <div className="row">
            <div className="col-12">
              <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination' />
            </div>
          </div>
        )
      }
      {
        !isLoading && recentlyPlayed.length === 0 && <Nodataviewall />
      }
      <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
    </div>
  )
}

export default withTranslation()(AllRecentlyPlayed)