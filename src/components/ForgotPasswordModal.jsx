import Modal from 'react-bootstrap/Modal';
import { IoMdCloseCircle } from "react-icons/io"
import { MdOutlineEmail } from "react-icons/md"
import { auth } from './Firebase';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { checkEmailApi } from '@/redux/actions/Campaign';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const ForgotPasswordModal = ({ show, onHide, onLoginClick, ...props }) => {

    const [email, setEmail] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSendMyPassword = (e) => {
        e.preventDefault();
        
                    auth.sendPasswordResetEmail(email)
                        .then(() => {
                            checkEmailApi({
                                email: email,
                                onSuccess: (res) => {
                                    toast.success(t('Password reset email sent. Check your email'));
                                    onLoginClick()
                                },
                                onError: (e) => {
                                    toast.error(e.message)
                                }
                            })
                            
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
                            <p className="entr_email">{t('Enter your email address')}</p>
                            <div className="input_with_icon">
                                <MdOutlineEmail className="all_icons" />
                                <input type="email" value={email} onChange={handleEmailChange} className="email_container" placeholder={t("Email")} required />
                            </div>
                            <button type="submit">{t('Sent')}</button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
    
        </>
    )
}

export default withTranslation()(ForgotPasswordModal)