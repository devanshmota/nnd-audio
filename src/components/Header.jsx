'use client'
// import { Dropdown, Space, Typography } from 'antd';
import { useState } from "react";
import LoginModel from "./LoginModel";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import Image from "next/image";
import nnd_logo from '../../public/images/nnd_web.png'

const items = [
  {
    key: '1',
    label: 'English',
  },
  {
    key: '2',
    label: 'Gujarati',
  },
];

const Header = ({ show }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false)

  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
    setIsRegisterModalVisible(false);
  };

  const handleRegisterClick = () => {
    setIsLoginModalVisible(false);
    setIsRegisterModalVisible(true);
  };

  const handleLoginSignup = (e) => {
    e.preventDefault();
    handleLoginClick();
  };

  const handleForgotPasswordClick = () => {
    setIsLoginModalVisible(false);
    setIsForgotPasswordVisible(true)
  }

  return (
    <>
      <div className="ms_header">
        <Image src={nnd_logo      } alt="nnd_logo" className="nnd__vertical_logo" width={80} height={20} />
        <div className="ms_top_right">
          <div className="ms_top_btn">
            <button className="header_login_btn" onClick={handleLoginSignup}>Login/Sign Up</button>
          </div>
        </div>

        <LoginModel show={isLoginModalVisible} onHide={() => setIsLoginModalVisible(false)} onRegisterClick={handleRegisterClick} onForgotPasswordClick={handleForgotPasswordClick} />

        <RegisterModal show={isRegisterModalVisible} onHide={() => setIsRegisterModalVisible(false)} onLoginClick={handleLoginClick} />

        <ForgotPasswordModal show={isForgotPasswordVisible} onHide={() => setIsForgotPasswordVisible(false)} />

      </div>

    </>
  )
}

export default Header
