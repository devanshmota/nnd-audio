'use client'

import { fetchSigleArtistDataApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Nodataviewall from "./Nodataviewall"
import OffCanvas from "./OffCanvas"
import { FaDownload, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa"
import GetCatLanguage from "./GetCatLanguage"
import GetLanguage from "./GetLanguage"
import Image from "next/image"
import { ClipLoader } from "react-spinners"

const GetAlbumMusic = ({ albumid }) => {

    
    
    const { language } = useSelector((state) => state.language)
    const [singleAlbumData, setSingleAlbumData] = useState([])
    const [albumDetails, setAlbumDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    
    useEffect(() => {
        fetchSigleArtistDataApi({
            album_id: albumid.id,
            is_guest: 0,
            onSuccess: (res) => {
                console.log(res)
                setSingleAlbumData(res.data)
                setAlbumDetails(res.data[0].album)
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
        <div className="container text-white mt-4">
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                singleAlbumData.length > 0 &&
                (
                    <>
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="d-flex flex-column flex-lg-row align-items-center gap-5">
                                    <Image src={albumDetails?.image} alt="profile" width={220} height={220} className="prfl_img" />
                                    <div className="d-flex flex-column gap-4">
                                        <h2 className="m-0">
                                            {albumDetails?.eng_name}
                                        </h2>
                                        <div className="d-flex align-items-center gap-3">
                                            <button className="dwnl_ply_btn">Download all</button>
                                            <button className="dwnl_ply_btn">Play all</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            {
                                singleAlbumData.map((item, index) => (
                                    <div key={index} className="col-lg-6 mt-4">
                                        <div className="d-flex align-items-center justify-content-between text-white music_card">
                                            <div className="d-flex align-items-center gap-3">
                                                <Image src={item.album.image} alt='jula_shree_ghanshyam' className="rounded" width={80} height={80} />
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
                                                <FaShareAlt className="icon_recent_plyd" />
                                                <FaDownload className="icon_recent_plyd" />
                                                {
                                                    item.playlist.length > 0 ? (
                                                        <FaHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                                                    )
                                                        :
                                                        (
                                                            <FaRegHeart className="icon_recent_plyd" onClick={() => handleSave(item.id)} />
                                                        )
                                                }
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
                !isLoading && singleAlbumData.length === 0 && <Nodataviewall />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </div>
    )
}

export default GetAlbumMusic