'use client'
import { deletePlaylistApi, getPlaylistApi } from "@/redux/actions/Campaign";
import { Button, Dropdown } from "antd"
import Image from "next/image"
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import CreatePlaylistModal from "./CreatePlaylistModal";
import toast from "react-hot-toast";
import RenamePlaylistModal from "./RenamePlaylistModal";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BreadCrumb from "./BreadCrumb";
import noImg from '../../public/noImageFound.svg'
import Link from "next/link";
import NoPlaylist from "./NoPlaylist";

const AllPlaylist = () => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const [playlist, setPlaylist] = useState([])
    const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false)
    const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
    const [initialRenameValue, setInitialRenameValue] = useState('');
    const [initialPlaylistid, setInitialPlaylistid] = useState(null)
    const [isGetPlaylist, setIsGetPlaylist] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            getPlaylistApi({
                onSuccess: (res) => {
                    if (res.data) {
                        setPlaylist(res.data)
                    }
                    setIsLoading(false)
                },
                onError: (e) => {
                    console.log(e)
                    setIsLoading(false)
                }
            })
            setIsGetPlaylist(false)
        }
    }, [isGetPlaylist])


    const items = [
        {
            label: t('Delete'),
            key: '1',
        },
        {
            label: t('Rename'),
            key: '2',
        },
    ];
    const handleMenuClick = (key, playlistId) => {
        if (key === '1') {
            deletePlaylistApi({
                id: playlistId,
                onSuccess: (res) => {
                    if (res.error === false) {
                        const updatedPlaylist = playlist.filter((item) => item.id !== playlistId)
                        setPlaylist(updatedPlaylist)
                        toast.success(t('Deleted successfully'))
                    }

                },
                onError: (e) => {
                    toast.error(t('Failed to delete'))
                    console.log(e)
                }
            })

        } else if (key === '2') {
            setInitialPlaylistid(playlistId)
            const playlistToRename = playlist.find((item) => item.id === playlistId);
            const initialValue = playlistToRename.title
            setInitialRenameValue(initialValue);
            setIsRenameModalVisible(true);
        }
    }

    const menuProps = (playlistId) => ({
        items,
        onClick: (item) => handleMenuClick(item.key, playlistId),
    });

    const createPlaylist = () => {
        setIsPlaylistModalVisible(true)
    }
    const handleCreatePlaylistSuccess = (newPlaylist) => {
        setPlaylist([...playlist, newPlaylist]);
    };

    const handleRenameSuccess = (updatedPlaylist) => {
        setPlaylist((prevPlaylist) =>
            prevPlaylist.map((item) =>
                item.id === updatedPlaylist.id ? updatedPlaylist : item
            )
        );
        setIsRenameModalVisible(false);
        toast.success(t('Playlist renamed successfully'));
    };

    return (
        <>
            <div className="container text-white mt-5">

                <div className="row">
                    <BreadCrumb title={t('Playlist')} />
                </div>

                <div className="row">

                    <div className="col-xl-2 col-lg-3 col-sm-4 col-6 text-white mt-5" onClick={createPlaylist} >
                        <div className="playlist_container">
                            <Image alt="playlist-icon" loading="lazy" width={30} height={30} layout="intrinsic" src="/playlist_icon.svg" />
                            <h6 className="m-0 text-center font-small">Create Playlist</h6>
                        </div>
                    </div>

                    {
                        playlist.length > 0 && playlist.map((item, index) => (
                            <div key={index} className="col-xl-2 col-lg-3 col-sm-4 col-6 d-flex justify-content-center mt-5">
                                <div className="card-container text-white">

                                    <Link href={`/playlist/${item.id}`} className="d-flex flex-column">
                                        <Image src={item?.music[0]?.album?.image || noImg} alt='playlist' className="rounded-4 view_all_images" layout="intrinsic" width={200} height={200} />
                                    </Link>


                                    <div className="d-flex align-items-center justify-content-between w-100">

                                        <Link href={`/playlist/${item.id}`} className="d-flex flex-column">
                                            <h6 className="m-0">{item.title}</h6>
                                            <p className="text-rec-pld">{item?.music?.length} {t('Songs')}</p>
                                        </Link>

                                        <Dropdown menu={menuProps(item.id)} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                                            <Button className="plylist_drp_btn"><BsThreeDotsVertical /></Button>
                                        </Dropdown>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <CreatePlaylistModal show={isPlaylistModalVisible} onHide={() => setIsPlaylistModalVisible(false)} handleCreatePlaylistSuccess={handleCreatePlaylistSuccess} />
            <RenamePlaylistModal show={isRenameModalVisible} onHide={() => setIsRenameModalVisible(false)} initialRenameValue={initialRenameValue} initialPlaylistid={initialPlaylistid} handleRenameSuccess={handleRenameSuccess} setIsGetPlaylist={setIsGetPlaylist} />
            {
                !isLoading && playlist.length === 0 && <NoPlaylist />
            }
        </>
    )
}

export default withTranslation()(AllPlaylist)