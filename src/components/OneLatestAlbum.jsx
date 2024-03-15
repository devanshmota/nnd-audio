'use client'
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import OffCanvas from "./OffCanvas";
import GetCatLanguage from "./GetCatLanguage";
import GetLanguage from "./GetLanguage";
import { ClipLoader } from "react-spinners";
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign";
import Image from "next/image";
import toast from "react-hot-toast";
import NoMusicsFound from "./NoMusicsFound";
import BreadCrumb from "./BreadCrumb";
import heartFilled from '../../public/nnd/heart_Fill.svg'
import heartIcon from '../../public/nnd/Heart_stork.svg'
import shareIcon from '../../public/nnd/song_Share.svg'
import noImg from '../../public/noImageFound.svg'

const OneLatestAlbum = ({ latestalbumid }) => {

    const { CurrentAlbum } = useSelector((state) => state.cachedata)
    const dispatch = useDispatch()
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
                setLatestAlbumDetails(res.data[0].artist)
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
        const index = singleLatestAlbumData.findIndex((item) => item.id === musicId);
        dispatch(setMusicPlaylist(singleLatestAlbumData))
        dispatch(setCurrentTrack(index))
        dispatch(setIsPlaying(true))
    };

    const handlePlayAll = () => {
        dispatch(setMusicPlaylist(singleLatestAlbumData))
        dispatch(setCurrentTrack(0))
        dispatch(setIsPlaying(true))
        toast.success(t('Playing All'))
    }

    const copyToClip = async () => {
        await navigator.clipboard.writeText(location.href)
        toast.success(t('Link copied to clipboard'))
    }

    return (
        <div className="container text-white mt-5">
            {isLoading &&
                <div className='w-100 h-100 d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            <BreadCrumb title={t('Latest Albums')} category={GetLanguage(language, CurrentAlbum)} />
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex flex-column flex-lg-row align-items-center gap-4 pb-4 pt-5 brdr_btm">
                        <Image src={CurrentAlbum?.image || noImg} alt="profile" width={180} height={180} className="prfl_img" />
                        <div className="d-flex flex-column align-items-center align-items-lg-start gap-4">
                            <h2 className="m-0">
                                {GetLanguage(language, CurrentAlbum)}
                            </h2>
                            {
                                singleLatestAlbumData.length > 0 && <button className="dwnl_ply_btn" onClick={handlePlayAll}>{t('Play All')}</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                {
                    singleLatestAlbumData.length > 0 && singleLatestAlbumData.map((item, index) => (
                        <div key={index} className="col-xxl-4 col-lg-6 mt-4">
                            <div className="d-flex align-items-center justify-content-between text-white music_card">
                                <div onClick={() => handlePlayMusic(item.id)} className="d-flex align-items-center gap-3 cursor-pointer">
                                    <Image src={item.album.image || noImg} alt='jula_shree_ghanshyam' className="rounded" width={80} height={80} />
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
                                                <Image src={heartFilled} className="icon_recent_plyd liked_rcnt" onClick={() => handleSave(item.id)} width={24} height={24} />
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
                !isLoading && singleLatestAlbumData.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(OneLatestAlbum)