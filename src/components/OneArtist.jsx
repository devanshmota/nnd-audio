'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import GetCatLanguage from "./GetCatLanguage"
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign"
import { ClipLoader } from "react-spinners"
import OffCanvas from "./OffCanvas"
import Nodataviewall from "./Nodataviewall"
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice"
import toast from "react-hot-toast"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const OneArtist = ({ artistid }) => {

    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleArtistData, setSingleArtistData] = useState([])
    const [artistDetails, setArtistDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);

    useEffect(() => {
        fetchSigleArtistDataApi({
            artist_id: artistid.slug,
            is_guest: 0,
            onSuccess: (res) => {
                setSingleArtistData(res.data)
                setArtistDetails(res.data[0].artist)
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

    const handlePlayMusic = (musicId) => {
        const index = singleArtistData.findIndex((item) => item.id === musicId);
        dispatch(setMusicPlaylist(singleArtistData))
        dispatch(setCurrentTrack(index))
        dispatch(setIsPlaying(true))
    };

    const handlePlayAll = () => {
        dispatch(setMusicPlaylist(singleArtistData))
        dispatch(setCurrentTrack(0))
        dispatch(setIsPlaying(true))
        toast.success(t('Playing All'))
    }

    return (
        <div className="container text-white mt-4">
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                singleArtistData.length > 0 &&
                (
                    <>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex flex-column flex-lg-row align-items-center gap-4">
                                    <Image src={artistDetails?.image} alt="profile" width={220} height={220} className="prfl_img" />
                                    <div className="d-flex flex-column align-items-center align-items-lg-start gap-4">
                                        <h2 className="m-0">
                                            {GetLanguage(language, artistDetails)}
                                        </h2>
                                        <button className="dwnl_ply_btn" onClick={handlePlayAll}>{t('Play All')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            {
                                singleArtistData.length > 0 && singleArtistData.map((item, index) => (

                                    <div key={index} className="col-lg-6 mt-4">
                                        <div className="d-flex align-items-center justify-content-between text-white music_card">
                                            <div onClick={() => handlePlayMusic(item.id)} className="d-flex align-items-center gap-3 cursor-pointer">
                                                <Image src={item.album.image} alt='jula_shree_ghanshyam' className="rounded" width={80} height={80} />
                                                <div className="d-flex flex-column gap-2">
                                                    <h5 className="m-0 text-break title_rcnt_plyd">
                                                        {GetLanguage(language, item)}
                                                        {/* Hore Jule Naval Hindol */}
                                                    </h5>
                                                    <p className="text-rec-pld desc_rcnt_plyd">
                                                        {GetCatLanguage(language, item)}
                                                        {/* Kirtan */}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 gap-md-3">
                                                <FaShareAlt className="icon_recent_plyd" />

                                                {token && (
                                                    <>
                                                        {item.playlist.length > 0 ? (
                                                            <FaHeart className="icon_recent_plyd liked_rcnt" onClick={() => handleSave(item.id)} />
                                                        ) : (
                                                            <FaRegHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
            {
                !isLoading && singleArtistData.length === 0 && <Nodataviewall />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneArtist)