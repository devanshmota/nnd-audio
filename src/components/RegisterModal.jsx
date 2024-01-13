import Modal from 'react-bootstrap/Modal';
import { MdOutlineEmail, MdPhone, MdTempleBuddhist } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaFlag, FaRegEyeSlash, FaTransgenderAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import LoginModel from './LoginModel';
import { FaBullseye } from 'react-icons/fa6';

const RegisterModal = ({ show, onHide, onLoginClick, ...props }) => {

   

    const handleLoginClick = () => {
        // onHide();
        onLoginClick();
    };

    // useEffect(() => {
    //     console.log(isLoginModalVisible)

    // }, [isLoginModalVisible])
    


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
                            <h2>Register</h2>
                            <p>Please enter your details to register</p>
                        </div>
                        <div className="input_container">


                            <div className="input_with_icon">
                                <FaUser className="all_icons" />
                                <input type="text" placeholder="First Name" required />
                            </div>
                            <div className="input_with_icon">
                                <FaUser className="all_icons" />
                                <input type="text" placeholder="Last Name" required />
                            </div>
                            <div className="input_with_icon">
                                <select name="gender" id="gender" required>
                                    <option value="" disabled selected hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <FaTransgenderAlt className="all_icons" />
                            </div>
                            <div className="input_with_icon">
                                <MdOutlineEmail className="all_icons" />
                                <input type="email" placeholder="Email" required />
                            </div>


                            <div className="input_with_icon">
                                <select name="country" id="country" >
                                    <option value="" disabled selected hidden>Country</option>
                                    <option value="india">India</option>
                                    <option value="pakistan">Pakistan</option>
                                </select>
                                <FaFlag className="all_icons" />
                            </div>
                            <div className="input_with_icon">
                                <select name="temple" id="temple" >
                                    <option value="" disabled selected hidden>Temple</option>
                                    <option value="">India</option>
                                    <option value="">Pakistan</option>
                                </select>
                                <MdTempleBuddhist className="all_icons" />
                            </div>

                            <div className="input_with_icon">
                                <MdPhone className="all_icons" />
                                <input type="tel" pattern='[0-9]{10}' placeholder="Phone Number" required />
                            </div>

                            <div className="input_with_icon">
                                <RiLockPasswordLine className="all_icons" />
                                <input type="password" placeholder="Password" required />
                                <FaRegEyeSlash className="eye_icon" />
                            </div>
                            <div className="input_with_icon">
                                <RiLockPasswordLine className="all_icons" />
                                <input type="password" placeholder="Repeat Password" required />
                                <FaRegEyeSlash className="eye_icon" />
                            </div>

                        </div>
                        <div className="btn_container">
                            <button>Login</button>
                            <p>Already have an account? <span onClick={handleLoginClick}>Login</span></p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* {
                isLoginModalVisible &&
                <LoginModel show={isLoginModalVisible} onHide={() => setIsLoginModalVisible(false)} />
            } */}


        </>
    )
}

export default RegisterModal