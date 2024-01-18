import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { auth } from './Firebase';
import toast, { Toaster } from 'react-hot-toast';


const LoginModel = ({ show, onHide, onRegisterClick, onForgotPasswordClick, ...props }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        e.preventDefault()
        let { name, value } = e.target
        setFormInfo((prevData) => ({ ...prevData, [name]: value }))
    }

    const Submit = (e) => {
        e.preventDefault()
        // setIsloading(true)
        auth.signInWithEmailAndPassword(formInfo.email, formInfo.password)
            .then(auth => {
                if (auth) {
                    if (auth.user.emailVerified) {
                        toast.success('Login successful')
                        setFormInfo({
                            email: '',
                            password: ''
                        })
                        onHide()
                    }
                    else {
                        toast.error('Email is not verified')
                    }
                }
                // setIsloading(false)
            })
            .catch((error) => toast.error(error.message))
    }


    const handleRegisterClick = () => {
        onRegisterClick();
    };

    const handleFrgtPassword = () => {
        onForgotPasswordClick()
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

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
                    <form className="login_form" onSubmit={Submit}>
                        <IoMdCloseCircle className="close_icon" onClick={onHide} />
                        <div className="header">
                            <h2>Login</h2>
                            <p>Please enter your email and password</p>
                        </div>
                        <div className="input_container">

                            <div className="input_with_icon">
                                <MdOutlineEmail className="all_icons" />
                                <input name='email' value={formInfo.email} onChange={handleChange} type="email" className="email_container" placeholder="Your Email" required />
                            </div>
                            <div className="input_with_icon">
                                <RiLockPasswordLine className="all_icons" />
                                <input value={formInfo.password} onChange={handleChange} name='password' type={passwordVisible ? 'text' : 'password'} placeholder="Password" required />
                                {passwordVisible ? (
                                    <FaRegEye
                                        className="eye_icon"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        className="eye_icon"
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>
                            <span onClick={handleFrgtPassword} className="forgot-password">Forgot Password?</span>
                        </div>
                        <div className="btn_container">
                            <button type='submit'>Login</button>
                            <p>
                                Don’t have any account?
                                <span onClick={handleRegisterClick}> Register</span>
                            </p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Toaster position="top-right" reverseOrder={false} />
        </>

    );
};

export default LoginModel