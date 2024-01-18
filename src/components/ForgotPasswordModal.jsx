import Modal from 'react-bootstrap/Modal';
import { IoMdCloseCircle } from "react-icons/io"
import { MdOutlineEmail } from "react-icons/md"
import { auth } from './Firebase';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const ForgotPasswordModal = ({ show, onHide, ...props }) => {

    const [email, setEmail] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSendMyPassword = (e) => {
        e.preventDefault();
        auth.fetchSignInMethodsForEmail(email)
            .then((signInMethods) => {
                console.log(signInMethods);
                if (signInMethods.length === 0) {
                    toast.error("Email not registered");
                } else {
                    auth.sendPasswordResetEmail(email)
                        .then(() => {
                            toast.success('Password reset email sent. Check your email.');
                        })
                        .catch((error) => {
                            toast.error(error.message);
                        });
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
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

                    <form className="login_form" onSubmit={handleSendMyPassword}>
                        <IoMdCloseCircle className="close_icon" onClick={onHide} />
                        <div className="input_container">
                            <p className="entr_email">Enter your email address</p>
                            <div className="input_with_icon">
                                <MdOutlineEmail className="all_icons" />
                                <input type="email" value={email} onChange={handleEmailChange} className="email_container" placeholder="Email" required />
                            </div>
                            <button type="submit">Send My Password</button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    )
}

export default ForgotPasswordModal