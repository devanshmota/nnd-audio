import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const MyModel = ({ show, onclose, ...props }) => {
    return (
        <Modal
            className='form'
            show={show}
            onHide={onclose}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body >
                <form className="login_form">
                    <IoMdCloseCircle className="close_icon" />
                    <div className="header">
                        <h2>Login</h2>
                        <p>Please enter your email and password</p>
                    </div>
                    <div className="input_container">

                        <div className="input_with_icon">
                            <MdOutlineEmail className="email_icon" />
                            <input type="email" className="email_container" placeholder="Your Email" required />
                        </div>
                        <div className="input_with_icon">
                            <RiLockPasswordLine className="password_icon" />
                            <input type="password" placeholder="Password" required />
                            <FaRegEyeSlash className="eye_icon" />
                        </div>
                        <span className="forgot-password">Forgot Password?</span>
                    </div>
                    <div className="btn_container">
                        <button>Login</button>
                        <p>Don’t have any account? <span>Register</span></p>
                    </div>
                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={onclose}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default MyModel