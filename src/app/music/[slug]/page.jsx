'use client'
import BreadCrumb from "@/components/BreadCrumb"
import NoMusicsFound from "@/components/NoMusicsFound"
import OffCanvas from "@/components/OffCanvas"
import SongCard from "@/components/SongCard"
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import SongPageHeader from "@/components/SongPageHeader"
import GetLanguage from "@/components/GetLanguage"

const SingleMusic = ({ params }) => {

  const { language } = useSelector((state) => state.language)
  const users = useSelector((state) => state.users)
  const token = users?.users?.token
  const [Music, setMusic] = useState([])
  const [Tag, setTag] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false)
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const [total, setTotal] = useState(0);
  const [offsetdata, setOffsetdata] = useState(0);
  const limit = 18;

  useEffect(() => {
    fetchSigleArtistDataApi({
      tags: params.slug,
      is_guest: token ? 0 : 1,
      offset: offsetdata,
      limit: limit,
      onSuccess: (res) => {
        setMusic(res.data)
        setTag(res.tags[0])
        setTotal(res.total)
        setIsLoading(false)
      },
      onError: (e) => {
        console.log(e)
        setIsLoading(false)
      }
    })
  }, [isLiked, selectedMusicId, offsetdata])

  const handleSave = (musicId) => {
    setSelectedMusicId(musicId);
    setIsOffCanvasOpen(true)
  }
  const handlePageChange = (selectedPage) => {
    const newOffset = selectedPage.selected * limit;
    setOffsetdata(newOffset);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container text-white mt-5">
      {isLoading &&
        <div className='d-flex align-items-center justify-content-center py-2'>
          <ClipLoader color="#ffffff" />
        </div>
      }
      {
        Music.length > 0 &&
        <>
          <BreadCrumb title={t('Music')} />
          <SongPageHeader playlist={Music} src={Music[0]?.album?.image} title={GetLanguage(language, Tag)} />
          <div className="row song_gap mt-4">
            <SongCard data={Music} handleSave={handleSave} />
          </div>
        </>
      }
      {
        total > 18 && singleUtsavData.length > 0 && (
          <div className="row">
            <div className="col-12">
              <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination' />
            </div>
          </div>
        )
      }
      {
        !isLoading && Music.length === 0 && <NoMusicsFound />
      }
      <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
    </div>
  )
}

export default withTranslation()(SingleMusic)