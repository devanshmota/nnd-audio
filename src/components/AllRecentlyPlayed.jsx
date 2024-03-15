'use client'
import { getRecentlyPlayedMusicApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaDownload, FaRegHeart, FaShareAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import GetCatLanguage from "./GetCatLanguage"
import { FaHeart } from "react-icons/fa";
import OffCanvas from "./OffCanvas"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import BreadCrumb from "./BreadCrumb"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import Pagination from './ReactPagination.jsx'
import heartFilled from '../../public/nnd/heart_Fill.svg'
import heartIcon from '../../public/nnd/Heart_stork.svg'
import shareIcon from '../../public/nnd/song_Share.svg'
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice"
import noImg from '../../public/noImageFound.svg'

const AllRecentlyPlayed = () => {

  const dispatch = useDispatch()
  const { language } = useSelector((state) => state.language)
  const users = useSelector((state) => state.users)
  const token = users?.users?.token
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [total, setTotal] = useState(0);
  const [offsetdata, setOffsetdata] = useState(0);
  const limit = 12;

  useEffect(() => {

    getRecentlyPlayedMusicApi({
      offset: offsetdata,
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
  const copyToClip = async () => {
    await navigator.clipboard.writeText(location.href)
    toast.success(t('Link copied to clipboard'))
  }

  const handlePlayMusic = (musicId) => {
    const index = recentlyPlayed.findIndex((item) => item.id === musicId);
    dispatch(setMusicPlaylist(recentlyPlayed))
    dispatch(setCurrentTrack(index))
    dispatch(setIsPlaying(true))
};

  return (
    <div className="container text-white">
      <div className="row mt-5">
        {isLoading &&
          <div className='d-flex align-items-center justify-content-center py-2'>
            <ClipLoader color="#ffffff" />
          </div>
        }
        <BreadCrumb title={t('Recently Played')} />
        {recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (
          <div key={index} className="col-xxl-4 col-lg-6 mt-5">
            <div className="d-flex align-items-center justify-content-between text-white music_card">
              <div className="d-flex align-items-center gap-3 cursor-pointer" onClick={() => handlePlayMusic(item.id)}>
                <Image src={item.album.image || noImg} alt={item.eng_title} className="rounded" width={80} height={80} />
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