'use client'
import { useEffect, useState } from "react"
import OffCanvas from "./OffCanvas";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign";
import GetLanguage from "./GetLanguage";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import NoMusicsFound from "./NoMusicsFound";
import BreadCrumb from "./BreadCrumb";
import SongPageHeader from "./SongPageHeader";
import SongCard from "./SongCard";
import Pagination from './ReactPagination.jsx'

const OneLyricist = ({ lyricistid }) => {

    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleLyricistData, setSingleLyricistData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 18;

    useEffect(() => {
        fetchSigleArtistDataApi({
            lyricist_id: lyricistid.slug,
            is_guest: token ? 0 : 1,
            offset: offsetdata,
            limit: limit,
            onSuccess: (res) => {
                setSingleLyricistData(res.data)
                setTotal(res.total)
                setIsLoading(false)
            },
            onError: (e) => {
                console.log(e)
                setIsLoading(false)
            }
        })
    }, [isLiked, selectedMusicId,offsetdata])

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
                singleLyricistData.length > 0 &&
                <>
                    <BreadCrumb title={t('Lyricists')} category={GetLanguage(language, singleLyricistData[0]?.lyricist)} link1='/lyricists' />
                    <SongPageHeader playlist={singleLyricistData} src={singleLyricistData[0]?.lyricist?.image} title={GetLanguage(language, singleLyricistData[0]?.lyricist)} />
                    <div className="row song_gap mt-4">
                        <SongCard data={singleLyricistData} handleSave={handleSave} />
                    </div>
                </>
            }

            {
                total > 18 && singleLyricistData.length > 0 && (
                    <div className="row">
                        <div className="col-12">
                            <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination' />
                        </div>
                    </div>
                )
            }

            {
                !isLoading && singleLyricistData.length === 0 && <NoMusicsFound />
            }

            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneLyricist)