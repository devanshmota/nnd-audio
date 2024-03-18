'use client'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign"
import { ClipLoader } from "react-spinners"
import OffCanvas from "./OffCanvas"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import NoMusicsFound from "./NoMusicsFound"
import BreadCrumb from "./BreadCrumb"
import SongPageHeader from "./SongPageHeader"
import SongCard from "./SongCard"



const OneArtist = ({ artistid }) => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleArtistData, setSingleArtistData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);

    useEffect(() => {
        fetchSigleArtistDataApi({
            artist_id: artistid.slug,
            is_guest: token ? 0 : 1,
            onSuccess: (res) => {
                setSingleArtistData(res.data)
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
            <BreadCrumb title={t('Artists')} category={GetLanguage(language, singleArtistData[0]?.artist)} link1='/artists-all' />
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                singleArtistData.length > 0 &&
                <>

                    <SongPageHeader playlist={singleArtistData} src={singleArtistData[0]?.artist?.image} title={GetLanguage(language, singleArtistData[0]?.artist)} />

                    <div className="row song_gap mt-4">
                        <SongCard data={singleArtistData} handleSave={handleSave} />
                    </div>
                </>
            }



            {
                !isLoading && singleArtistData.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneArtist)