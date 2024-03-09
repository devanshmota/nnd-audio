'use client'
import { createPlaylistApi, deleteMusicPlaylistApi, getPlaylistApi, saveMusicToPlaylistApi } from '@/redux/actions/Campaign';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import toast from 'react-hot-toast';
import { MdPlaylistAdd } from 'react-icons/md';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const OffCanvas = ({ show, handleSave, onHide, selectedMusicId, isLiked, setIsLiked, ...props }) => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const [playlist, setPlaylist] = useState([])
    const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false)
    const [playlistName, setPlaylistName] = useState('')
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [prevSelectedPlaylists, setPrevSelectedPlaylists] = useState([]);

    useEffect(() => {
        if (token) {
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
        }
    }, [isLiked, token])

    useEffect(() => {
        const initialSelectedPlaylists = playlist.filter((item) => item.music.some((music) => music.id === selectedMusicId)).map((item) => item.id);
        setSelectedPlaylists(initialSelectedPlaylists);
        setPrevSelectedPlaylists(initialSelectedPlaylists)
    }, [playlist, selectedMusicId]);

    const handleChange = (e) => {
        setPlaylistName(e.target.value)
    }

    const handleCheckboxChange = (e, item) => {
        const { checked } = e.target;
        setSelectedPlaylists((prevSelectedPlaylists) => {
            if (checked) {
                return [...prevSelectedPlaylists, item.id];
            } else {
                return prevSelectedPlaylists.filter((id) => id !== item.id);
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
                    toast.success(t('Playlist Created'));
                }
            },
            onError: (e) => {
                toast.error(t('Failed to create playlist'));
            }
        })
    }

    const saved = () => {

        const playlistsToDelete = prevSelectedPlaylists.filter(
            (prevId) => !selectedPlaylists.includes(prevId)
        );

        if (playlistsToDelete.length > 0) {
            deleteMusicPlaylistApi({
                id: playlistsToDelete.join(','),
                music_id: selectedMusicId,
                onSuccess: (res) => {
                    if (res.error === false) {
                        toast.success(t('Deleted Successfully'));
                        onHide()
                        setIsLiked(!isLiked)
                    }
                },
                onError: (e) => {
                    toast.error(e.message);
                }
            })
        }

        const playlistsToAdd = selectedPlaylists.filter(
            (currentId) => !prevSelectedPlaylists.includes(currentId)
        );

        if (playlistsToAdd.length > 0) {
            saveMusicToPlaylistApi({
                id: playlistsToAdd.join(','),
                music_id: selectedMusicId,
                onSuccess: (res) => {
                    if (res.error === false) {
                        toast.success(t('Saved Successfully'));
                        setIsLiked(!isLiked)
                        onHide()
                    }
                },
                onError: (e) => {
                    toast.error(e.message);
                }
            })
        }

    }

    return (
        <>
            <Offcanvas placement="end" show={show} onHide={onHide} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{t('Add to playlist')}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex flex-column gap-3 h-100'>
                        <div className="playlist_container_canvas text-white" onClick={handleCreateClick} >
                            <Image src='/playlist_icon.svg' alt='playlist-icon' width={28} height={14} />
                            <p className="m-0 text-small">{t('Create Playlist')}</p>
                        </div>

                        {
                            isCreatePlaylistOpen &&
                            <form className='canvas_form d-flex flex-column gap-3 position-relative' onSubmit={submitCreate}>
                                <div className="input_with_icon">
                                    <MdPlaylistAdd className="all_icons" />
                                    <input name='playlistname' type="text" onChange={handleChange} value={playlistName} placeholder={t("Enter playlist name")} required />
                                </div>
                                <button type='submit'>{t('Create')}</button>
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
                                                        <input
                                                            type="checkbox"
                                                            onChange={(e) => handleCheckboxChange(e, item)}
                                                            checked={selectedPlaylists.includes(item.id)}

                                                        />
                                                    </div>
                                                    <h6 className="m-0 text-center">{item.title}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <button className='mt-auto save_button' onClick={saved} >{t('Save')}</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default withTranslation()(OffCanvas)