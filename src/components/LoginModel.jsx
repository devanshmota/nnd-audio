import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import RegisterModal from './RegisterModal';

const LoginModel = ({ show, onHide, onRegisterClick, onForgotPasswordClick, ...props }) => {

    const handleRegisterClick = () => {
        // onHide();
        onRegisterClick(); 
    };

    const handleFrgtPassword = () => {
        onForgotPasswordClick()
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
                    <form className="login_form">
                        <IoMdCloseCircle className="close_icon" onClick={onHide} />
                        <div className="header">
                            <h2>Login</h2>
                            <p>Please enter your email and password</p>
                        </div>
                        <div className="input_container">

                            <div className="input_with_icon">
                                <MdOutlineEmail className="all_icons" />
                                <input type="email" className="email_container" placeholder="Your Email" required />
                            </div>
                            <div className="input_with_icon">
                                <RiLockPasswordLine className="all_icons" />
                                <input type="password" placeholder="Password" required />
                                <FaRegEyeSlash className="eye_icon" />
                            </div>
                            <span onClick={handleFrgtPassword} className="forgot-password">Forgot Password?</span>
                        </div>
                        <div className="btn_container">
                            <button>Login</button>
                            <p>
                                Don’t have any account? 
                                <span onClick={handleRegisterClick}> Register</span>
                            </p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        

        </>

    );
};

export default LoginModel