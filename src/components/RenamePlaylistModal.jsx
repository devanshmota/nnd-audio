'use client'
import { updatePlaylistApi } from "@/redux/actions/Campaign";
import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";


const RenamePlaylistModal = ({ show, onHide, initialRenameValue, initialPlaylistid, handleRenameSuccess, setIsGetPlaylist, ...props }) => {

    const [renamed, setRenamed] = useState('')

    useEffect(() => {
        setRenamed(initialRenameValue)
    }, [initialRenameValue])

    const handleRenamed = (e) => {
        setRenamed(e.target.value);
    };

    const handleRenamePlaylist = (e) => {
        e.preventDefault()
        updatePlaylistApi({
            title: renamed,
            id: initialPlaylistid,
            onSuccess: (res) => {
                if (res.error === false) {
                    const updatedPlaylist = res.data;
                    handleRenameSuccess(updatedPlaylist);
                    setRenamed('')
                    setIsGetPlaylist(true)
                }
            },
            onError: (e) => {
                toast.error('Failed to rename');
            }
        })
        onHide()
    }

    return (
        <Modal
            className='form_container'
            show={show}
            onHide={onHide}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body >
                <form className="create_playlist_modal" onSubmit={handleRenamePlaylist} >
                    <IoMdCloseCircle className="close_icon" onClick={onHide} />
                    <h4 className="m-0">Rename Playlist</h4>
                    <div className="input_with_icon">
                        <MdDriveFileRenameOutline className="all_icons" />
                        <input name='renamedplaylist' value={renamed} onChange={handleRenamed} type="text" placeholder="Enter playlist name" required />
                    </div>
                    <button type="submit">Update</button>
                </form>

            </Modal.Body>
        </Modal>
    )
}

export default RenamePlaylistModal