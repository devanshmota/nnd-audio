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

const OneUtsav = ({ utsavid }) => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleUtsavData, setSingleUtsavData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)

    useEffect(() => {
        fetchSigleArtistDataApi({
            utsav_id: utsavid.slug,
            is_guest: token ? 0 : 1,
            onSuccess: (res) => {
                setSingleUtsavData(res.data)
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
            <BreadCrumb link1='/utsav-all' title={t('Utsav')} category={GetLanguage(language, singleUtsavData[0]?.utsav)} />

            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }

            {
                singleUtsavData.length > 0 &&
                <>
                    <SongPageHeader playlist={singleUtsavData} src={singleUtsavData[0]?.utsav.image} title={GetLanguage(language, singleUtsavData[0]?.utsav)} />

                    <div className="row song_gap mt-4">
                        <SongCard data={singleUtsavData} handleSave={handleSave} />
                    </div>
                </>
            }
            {
                !isLoading && singleUtsavData.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneUtsav)