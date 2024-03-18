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

    useEffect(() => {
        fetchSigleArtistDataApi({
            lyricist_id: lyricistid.slug,
            is_guest: token ? 0 : 1,
            onSuccess: (res) => {
                setSingleLyricistData(res.data)
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
        <div className="container text-white mt-5">
            <BreadCrumb title={t('Lyricists')} category={GetLanguage(language, singleLyricistData[0]?.lyricist)} link1='/lyricists-all' />
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                singleLyricistData.length > 0 &&
                <>
                    <SongPageHeader playlist={singleLyricistData} src={singleLyricistData[0]?.lyricist?.image} title={GetLanguage(language, singleLyricistData[0]?.lyricist)} />
                    <div className="row song_gap mt-4">
                        <SongCard data={singleLyricistData} handleSave={handleSave} />
                    </div>
                </>
            }



            {
                !isLoading && singleLyricistData.length === 0 && <NoMusicsFound />
            }

            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneLyricist)