'use client'

import BreadCrumb from "@/components/BreadCrumb"
import NoMusicsFound from "@/components/NoMusicsFound"
import OffCanvas from "@/components/OffCanvas"
import SongCard from "@/components/SongCard"
import SongPageHeader from "@/components/SongPageHeader"
import { getPlaylistApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const SinglePlaylist = ({ params }) => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const [PlaylistDetail, setPlaylistDetail] = useState(null)
    const [playlistSong, setPlaylistSong] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)

    useEffect(() => {
        if (token) {
            setIsLoading(true)
            getPlaylistApi({
                onSuccess: (res) => {
                    if (res.data) {
                       
                        const response = res?.data?.find((item) => item.id === Number(params.slug))
                        setPlaylistDetail(response)
                        setPlaylistSong(response.music)
                        setIsLoading(false)
                    }
                },
                onError: (e) => {
                    console.log(e)
                    setIsLoading(false)
                }
            })
        }
    }, [isLiked, selectedMusicId])

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
            {
                playlistSong.length > 0 &&
                <>
                    <BreadCrumb link1='/playlist' title={t('Playlist')} category={PlaylistDetail.title} />
                    <SongPageHeader playlist={playlistSong} src={playlistSong[0].album.image} title={PlaylistDetail.title} />
                    <div className="row song_gap mt-4">
                        <SongCard data={playlistSong} handleSave={handleSave} />
                    </div>
                </>
            }
            {
                !isLoading && playlistSong.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(SinglePlaylist)