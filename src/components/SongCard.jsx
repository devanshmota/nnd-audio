'use client'
import { useDispatch, useSelector } from "react-redux";
import noImg from '../../public/noImageFound.svg'
import heartFilled from '../../public/nnd/heart_Fill.svg'
import heartIcon from '../../public/nnd/Heart_stork.svg'
import shareIcon from '../../public/nnd/song_Share.svg'
import GetLanguage from "./GetLanguage";
import GetCatLanguage from "./GetCatLanguage";
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice";
import toast from "react-hot-toast";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import Image from "next/image";

const SongCard = ({ data, handleSave }) => {

    const { language } = useSelector((state) => state.language)
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const token = users?.users?.token


    const handlePlayMusic = (musicId) => {
        const index = data.findIndex((item) => item.id === musicId);
        dispatch(setMusicPlaylist(data))
        dispatch(setCurrentTrack(index))
        dispatch(setIsPlaying(true))
    };
    const copyToClip = async () => {
        await navigator.clipboard.writeText(location.href)
        toast.success(t('Link copied to clipboard'))
    }

    const handleLike = (musicId) => {
        handleSave(musicId)
    }


    return (
        <>
            
                {
                    data.map((item, index) => (
                        <div key={index} className="col-xxl-4 col-lg-6">
                            <div className="d-flex align-items-center justify-content-between text-white music_card">
                                <div onClick={() => handlePlayMusic(item.id)} className="d-flex align-items-center gap-3 cursor-pointer">
                                    <Image src={item.album.image || noImg} alt='jula_shree_ghanshyam' className="rounded" width={80} height={80} />
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
                                                <Image src={heartFilled} className="icon_recent_plyd" onClick={() => handleLike(item.id)} width={24} height={24} />
                                            ) : (
                                                <Image src={heartIcon} className="icon_recent_plyd" onClick={() => handleLike(item.id)} width={24} height={24} />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }
        </>
    )
}

export default withTranslation()(SongCard)