'use client'

import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import OffCanvas from "./OffCanvas"
import Image from "next/image"
import { ClipLoader } from "react-spinners"
import GetLanguage from "./GetLanguage"
import GetCatLanguage from "./GetCatLanguage"
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice"
import toast from "react-hot-toast"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import NoMusicsFound from "./NoMusicsFound"
import BreadCrumb from "./BreadCrumb"
import heartFilled from '../../public/nnd/heart_Fill.svg'
import heartIcon from '../../public/nnd/Heart_stork.svg'
import shareIcon from '../../public/nnd/song_Share.svg'


const OneUtsav = ({ utsavid }) => {

    const { CurrentAlbum } = useSelector((state) => state.cachedata)
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleUtsavData, setSingleUtsavData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);

    useEffect(() => {
        fetchSigleArtistDataApi({
            utsav_id: utsavid.slug,
            is_guest: 1,
            onSuccess: (res) => {
                setSingleUtsavData(res.data)
                setUtsavDetails(res.data[0].utsav)
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
        const index = singleUtsavData.findIndex((item) => item.id === musicId);
        dispatch(setMusicPlaylist(singleUtsavData))
        dispatch(setCurrentTrack(index))
        dispatch(setIsPlaying(true))
    };

    const handlePlayAll = () => {
        dispatch(setMusicPlaylist(singleUtsavData))
        dispatch(setCurrentTrack(0))
        dispatch(setIsPlaying(true))
        toast.success('Playing All')
    }
    const copyToClip = async () => {
        await navigator.clipboard.writeText(location.href)
        toast.success(t('Link copied to clipboard'))
    }

    return (
        <div className="container text-white mt-5">
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            <BreadCrumb link1='/utsav-all' title={t('Utsav')} category={GetLanguage(language, CurrentAlbum)} />
            <div className="row">

                <div className="col-lg-12">
                    <div className="d-flex flex-column flex-lg-row align-items-center gap-4 pb-4 py-5 brdr_btm">
                        <Image src={CurrentAlbum?.image} alt="profile" width={180} height={180} className="prfl_img" />
                        <div className="d-flex flex-column gap-4">
                            <h2 className="m-0">
                                {GetLanguage(language, CurrentAlbum)}
                            </h2>
                            {
                                singleUtsavData.length > 0 && <button className="dwnl_ply_btn" onClick={handlePlayAll}>{t('Play All')}</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                {
                    singleUtsavData.length > 0 && singleUtsavData.map((item, index) => (

                        <div key={index} className="col-xxl-4 col-lg-6 mt-4">
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
                !isLoading && singleUtsavData.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneUtsav)