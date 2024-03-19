'use client'
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import GetLanguage from "./GetLanguage"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import NoMusicsFound from "./NoMusicsFound"
import BreadCrumb from "./BreadCrumb"
import SongPageHeader from "./SongPageHeader"
import SongCard from "./SongCard"
import { useSelector } from "react-redux"
import OffCanvas from "./OffCanvas"
import Pagination from './ReactPagination.jsx'

const OneUtsav = ({ utsavid }) => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleUtsavData, setSingleUtsavData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 18;

    useEffect(() => {
        fetchSigleArtistDataApi({
            utsav_id: utsavid.slug,
            is_guest: token ? 0 : 1,
            offset: offsetdata,
            limit: limit,
            onSuccess: (res) => {
                setSingleUtsavData(res.data)
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
                singleUtsavData.length > 0 &&
                <>
                    <BreadCrumb link1='/utsav' title={t('Utsav')} category={GetLanguage(language, singleUtsavData[0]?.utsav)} />
                    <SongPageHeader playlist={singleUtsavData} src={singleUtsavData[0]?.utsav.image} title={GetLanguage(language, singleUtsavData[0]?.utsav)} />
                    <div className="row song_gap mt-4">
                        <SongCard data={singleUtsavData} handleSave={handleSave} />
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
                !isLoading && singleUtsavData.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneUtsav)