'use client'
import { createPlaylistApi, getPlaylistApi, saveMusicToPlaylistApi } from '@/redux/actions/Campaign';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import toast from 'react-hot-toast';
import { MdPlaylistAdd } from 'react-icons/md';

const OffCanvas = ({ show, handleSave, onHide, selectedMusicId, ...props }) => {

    const [playlist, setPlaylist] = useState([])
    const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false)
    const [playlistName, setPlaylistName] = useState('')
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

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
    const handleChange = (e) => {
        setPlaylistName(e.target.value)
    }

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prevSelectedPlaylists) => {
            if (prevSelectedPlaylists.includes(playlistId)) {
                return prevSelectedPlaylists.filter((id) => id !== playlistId);
            } else {
                return [...prevSelectedPlaylists, playlistId];
            }
        });
    };

    const handleCreateClick = () => {
        setIsCreatePlaylistOpen(!isCreatePlaylistOpen)
    }

    const submitCreate = (e) => {
        e.preventDefault()
        createPlaylistApi({
            title: playlistName,
            onSuccess: (res) => {
                if (res.error === false) {
                    setPlaylist([...playlist, res.data])
                    setPlaylistName('')
                    setIsCreatePlaylistOpen(false)
                    toast.success('Playlist Created');
                }
            },
            onError: (e) => {
                toast.error('Failed to create playlist');
            }
        })
    }

    const saved = () => {

        const playlistIdsAsNumbers = selectedPlaylists.map(Number);
        saveMusicToPlaylistApi({
            id: playlistIdsAsNumbers.join(','),
            music_id: selectedMusicId,
            onSuccess: (res) => {
                if (res.error === false) {
                    toast.success('Saved Successfully');
                    onHide()
                }
            },
            onError: (e) => {
                toast.error(e.message);
            }
        })
    }

    return (
        <>
            <Offcanvas placement="end" show={show} onHide={onHide} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add to playlist</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex flex-column gap-3 h-100'>
                        <div className="playlist_container_canvas text-white" onClick={handleCreateClick} >
                            <Image src='/playlist_icon.svg' alt='playlist-icon' width={28} height={14} />
                            <p className="m-0 text-small">Create Playlist</p>
                        </div>

                        {
                            isCreatePlaylistOpen &&
                            <form className='canvas_form d-flex flex-column gap-3 position-relative' onSubmit={submitCreate}>
                                <div className="input_with_icon">
                                    <MdPlaylistAdd className="all_icons" />
                                    <input name='playlistname' type="text" onChange={handleChange} value={playlistName} placeholder="Enter playlist name" required />
                                </div>
                                <button type='submit'>Create</button>
                            </form>
                        }

                        <div className="container">
                            <div className="row">


                                {
                                    playlist.length > 0 && playlist.map((item, index) => (
                                        <div key={index} className="col-lg-6">
                                            <div className="d-flex flex-column align-items-center text-white position-relative py-3" key={index}>
                                                <div className="position-relative d-flex flex-column gap-2">

                                                    {
                                                        item.music.length > 0 ? (
                                                            <Image src={item?.music[0]?.album?.image} alt='utshav_img_1' className="rounded" width={150} height={150} />
                                                        )
                                                            :
                                                            (
                                                                <Image src='/Audio_hedphone.svg' alt='utshav_img_1' className="rounded" width={150} height={150} />
                                                            )
                                                    }

                                                    <div className="position-absolute chckbox_setter">
                                                        <input type="checkbox" onChange={() => handleCheckboxChange(item.id)}
                                                            checked={selectedPlaylists.includes(item.id)} />
                                                    </div>
                                                    <h6 className="m-0 text-center">{item.title}</h6>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>
                        </div>

                        <button className='mt-auto save_button' onClick={saved} >Save</button>
                    </div>



                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default OffCanvas