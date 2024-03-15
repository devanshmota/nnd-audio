'use client'
import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import OffCanvas from "./OffCanvas"
import GetCatLanguage from "./GetCatLanguage"
import GetLanguage from "./GetLanguage"
import Image from "next/image"
import { ClipLoader } from "react-spinners"
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice"
import toast from "react-hot-toast"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import NoMusicsFound from "./NoMusicsFound"
import BreadCrumb from "./BreadCrumb"
import heartFilled from '../../public/nnd/heart_Fill.svg'
import heartIcon from '../../public/nnd/Heart_stork.svg'
import shareIcon from '../../public/nnd/song_Share.svg'


const GetAlbumMusic = ({ albumid }) => {

    const dispatch = useDispatch()
    const { BreadcrumbCategory } = useSelector((state) => state.cachedata)
    const { CurrentAlbum } = useSelector((state) => state.cachedata)
    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [singleAlbumData, setSingleAlbumData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);

    useEffect(() => {

        fetchSigleArtistDataApi({
            album_id: albumid.id,
            is_guest: token ? 0 : 1,
            onSuccess: (res) => {
                setSingleAlbumData(res.data)
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
        const index = singleAlbumData.findIndex((item) => item.id === musicId);
        dispatch(setMusicPlaylist(singleAlbumData))
        dispatch(setCurrentTrack(index))
        dispatch(setIsPlaying(true))
    };

    const handlePlayAll = () => {
        dispatch(setMusicPlaylist(singleAlbumData))
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
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            <BreadCrumb
                title={t('Music Categories')}
                category={GetLanguage(language, BreadcrumbCategory)}
                subcategory={GetLanguage(language, CurrentAlbum)}
                link1='/music-categories-all'
                link2= {`/music-categories-all/${albumid.slug}`}
                />
            <div className="row">

                <div className="col-lg-12">
                    <div className="d-flex flex-column flex-lg-row align-items-center gap-4 pb-4 pt-5 brdr_btm">
                        <Image src={CurrentAlbum?.image} alt="profile" width={180} height={180} className="prfl_img" />
                        <div className="d-flex flex-column align-items-center align-items-lg-start gap-4">
                            <h2 className="m-0">
                                {GetLanguage(language, CurrentAlbum)}
                            </h2>
                            {
                                singleAlbumData.length > 0 && <button className="dwnl_ply_btn" onClick={handlePlayAll}>{t('Play All')}</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                {
                    singleAlbumData.map((item, index) => (
                        <div key={index} className="col-xxl-4 col-lg-6 mt-4">
                            <div className="d-flex align-items-center justify-content-between text-white music_card">
                                <div className="d-flex align-items-center gap-3 cursor-pointer" onClick={() => handlePlayMusic(item.id)}>
                                    <Image src={item.album.image} alt='jula_shree_ghanshyam' className="rounded-4" width={80} height={80} />
                                    <div className="d-flex flex-column gap-2">
                                        <h5 className="m-0 text-break title_rcnt_plyd">
                                            {GetLanguage(language, item)}
                                        </h5>
                                        <p className="text-rec-pld desc_rcnt_plyd">
                                            {GetCatLanguage(language, item)}
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
                                                <Image src={heartIcon} className="icon_recent_plyd" onClick={() => handleSave(item.id)} width={24} height={24}/>
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
                !isLoading && singleAlbumData.length === 0 && <NoMusicsFound />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default withTranslation()(GetAlbumMusic)