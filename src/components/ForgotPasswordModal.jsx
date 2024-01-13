import Modal from 'react-bootstrap/Modal';
import { IoMdCloseCircle } from "react-icons/io"
import { MdOutlineEmail } from "react-icons/md"

const ForgotPasswordModal = ({ show, onHide, ...props }) => {
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

                <form className="login_form">
                    <IoMdCloseCircle className="close_icon" onClick={onHide} />
                    <div className="input_container">
                        <p className="entr_email">Enter your email address</p>
                        <div className="input_with_icon">
                            <MdOutlineEmail className="all_icons" />
                            <input type="email" className="email_container" placeholder="Email" required />
                        </div>
                        <button type="submit">Send My Password</button>
                    </div>

                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ForgotPasswordModal