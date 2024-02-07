import { createPlaylistApi } from "@/redux/actions/Campaign";
import { useState } from "react";
import { Modal } from "react-bootstrap"
import { IoMdCloseCircle } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import toast from 'react-hot-toast';


const CreatePlaylistModal = ({ show, onHide, handleCreatePlaylistSuccess, ...props }) => {

    const [playListName, setPlayListName] = useState('')

    const handlePlaylistName = (e) => {
        setPlayListName(e.target.value)
    }

    const handleCreatePlaylist = (e) => {
        e.preventDefault()

        createPlaylistApi({
            title: playListName,
            onSuccess: (res) => {
                if (res.error === false) {
                    handleCreatePlaylistSuccess(res.data)
                    setPlayListName('')
                    toast.success('Playlist Created');
                }
            },
            onError: (e) => {
                toast.error('Failed to create playlist');
            }
        })
        onHide()
    }

    return (
        <>
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
                    <form className="create_playlist_modal" onSubmit={handleCreatePlaylist} >
                        <IoMdCloseCircle className="close_icon" onClick={onHide} />
                        <h4 className="m-0">Create Playlist</h4>
                        <div className="input_with_icon">
                            <MdPlaylistAdd className="all_icons" />
                            <input name='playlistname' value={playListName} onChange={handlePlaylistName} type="text" placeholder="Enter playlist name" required />
                        </div>
                        <button type="submit">Create</button>
                    </form>

                </Modal.Body>
            </Modal>

        </>
    )
}

export default CreatePlaylistModal