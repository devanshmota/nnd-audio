'use client'
import Modal from 'react-bootstrap/Modal';
import { IoMdCloseCircle } from 'react-icons/io';
import { getDecryptedText } from '@/decryption/decryption';

const PlayLiveVideoModal = ({ show, onHide, videoDetails, ...props }) => {
    
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


          <Modal.Body className='modal_body'>

              <div className='d-flex align-items-center justify-content-between p-3 w-100 border-bottom border-2'>
                  <h4 className="m-0 video_modal_title">{videoDetails?.title}</h4>
                  <IoMdCloseCircle className="close_icon_modal" onClick={onHide} />
              </div>

              <div className='video_container'>
                  <iframe
                      width="100%"
                      height="400px"
                      src={`https://www.youtube.com/embed/${getDecryptedText(videoDetails?.videoid)}?`}
                      title={videoDetails?.title}
                      allowFullScreen
                  ></iframe>
              </div>

          </Modal.Body>
      </Modal>
  )
}

export default PlayLiveVideoModal