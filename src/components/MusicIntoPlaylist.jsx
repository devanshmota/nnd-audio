'use client'
import { getPlaylistApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"

const MusicIntoPlaylist = () => {

    const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false)
    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        getPlaylistApi({
            onSuccess: (res) => {
                if (res.data) {
                    setPlaylist(res.data)
                }
            },
            onError: (e) => {
                console.log(e)
            }
        })

    }, [])
    return (
        <div className="container text-white">
            <div className="row">
                <div className="col-lg-12">
                    <div className="playlist_container text-white" onClick={createPlaylist}>
                        <Image src='/playlist_icon.svg' alt='playlist-icon' width={51} height={37} />
                        <h5 className="m-0">Create Playlist</h5>
                    </div>

                    <form>
                        {
                            playlist.length > 0 && playlist.map((item, index) => (
                                <div key={index}>
                                    <input type="checkbox" name={item.title} id={item.title} />
                                    <label>{item.title}</label>
                                </div>
                            ))
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MusicIntoPlaylist