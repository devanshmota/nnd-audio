'use client'
// import { Dropdown, Space, Typography } from 'antd';
import { useEffect, useState } from "react";
import LoginModel from "./LoginModel";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import Image from "next/image";
import nnd_logo from '../../public/images/nnd_web.png'
import { auth } from './Firebase';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import Dropdown from 'react-bootstrap/Dropdown';
import { setUsers } from "@/redux/reducer/UsersSlice";
import { logoutApi } from "@/redux/actions/Campaign";
import toast, { Toaster } from "react-hot-toast";
import { getDecryptedText } from "@/decryption/decryption";


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





const Header = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false)

  useEffect(() => {
    const encryptedText = users.users.data.email;
    const decryptedText = getDecryptedText(encryptedText)
    console.log('Decrypted Text:', decryptedText);

  }, [users.users.data.email]);

  const handleLoginClick = () => {
    setIsRegisterModalVisible(false);
    setIsForgotPasswordVisible(false);
    setIsLoginModalVisible(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalVisible(true);
    setIsLoginModalVisible(false);
  };

  const handleLoginSignup = (e) => {
    e.preventDefault();
    handleLoginClick();
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordVisible(true)
    setIsLoginModalVisible(false);
  }

  const handleLogout = async () => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut();
        logoutApi({
          onSuccess: (res) => {
            console.log(res)
            dispatch(setUsers({}));

            Swal.fire({
              title: "Logout!",
              text: "Logged out successfully",
              icon: "success"
            });
          },
          onError: (e) => {
            console.log(e)
            toast.error(e.message)
          }
        })

      }
    });

  };

  const token = users.users?.token

  return (
    <>
      <div className="ms_header">
        <Image src={nnd_logo} alt="nnd_logo" className="nnd__vertical_logo" width={80} height={20} />
        <div className="ms_top_right">
          <div className="ms_top_btn">
            {
              token ?
                (


                  <Dropdown onSelect={handleLogout}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic-button" className="dropdown_toggle">
                      Hello
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>


                )
                :
                (
                  <button className="header_login_btn" onClick={handleLoginSignup}>Login/Sign Up</button>
                )
            }
          </div>
        </div>

        <LoginModel show={isLoginModalVisible} onHide={() => setIsLoginModalVisible(false)} onRegisterClick={handleRegisterClick} onForgotPasswordClick={handleForgotPasswordClick} />

        <RegisterModal show={isRegisterModalVisible} onHide={() => setIsRegisterModalVisible(false)} onLoginClick={handleLoginClick} />

        <ForgotPasswordModal show={isForgotPasswordVisible} onLoginClick={handleLoginClick} onHide={() => setIsForgotPasswordVisible(false)} />

      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default Header
