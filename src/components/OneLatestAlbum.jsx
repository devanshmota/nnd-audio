'use client'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import OffCanvas from "./OffCanvas";
import GetLanguage from "./GetLanguage";
import { ClipLoader } from "react-spinners";
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign";
import NoMusicsFound from "./NoMusicsFound";
import BreadCrumb from "./BreadCrumb";
import SongPageHeader from "./SongPageHeader";
import SongCard from "./SongCard";

const OneLatestAlbum = ({ latestalbumid }) => {


    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleLatestAlbumData, setSingleLatestAlbumData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);


    useEffect(() => {
        fetchSigleArtistDataApi({
            album_id: latestalbumid.slug,
            is_guest: token ? 0 : 1,
            onSuccess: (res) => {
                setSingleLatestAlbumData(res.data)
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

            <BreadCrumb title={t('Latest Albums')} category={GetLanguage(language, singleLatestAlbumData[0]?.album)} />
            {isLoading &&
                <div className='w-100 h-100 d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                singleLatestAlbumData.length > 0 &&
                <>

                    <SongPageHeader playlist={singleLatestAlbumData} src={singleLatestAlbumData[0]?.album?.image} title={GetLanguage(language, singleLatestAlbumData[0]?.album)} />

                    <div className="row song_gap mt-4">
                        <SongCard data={singleLatestAlbumData} handleSave={handleSave} />
                    </div>

                </>
            }

            {
                !isLoading && singleLatestAlbumData.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneLatestAlbum)