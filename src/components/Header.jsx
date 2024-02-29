'use client'
import React, { useState } from "react";
import LoginModel from "./LoginModel";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/reducer/LanguageSlice";
import { Dropdown, DropdownButton } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BasicMenu from "./BasicMenu";
import NotificationBell from "./NotificationBell";


const Header = ({ open, handleDrawerOpen }) => {

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const { language } = useSelector((state) => state.language)
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const token = users?.users?.token

  const handleLanguageChange = (eventKey) => {
    dispatch(setLanguage(eventKey))
  }

  return (
    <>
      <div className="ms_header">
        {/* <Image src={nnd_logo} alt="nnd_logo" className="nnd__vertical_logo" width={80} height={20} /> */}
        <div className="ms_top_right">
          <div className="ms_top_btn">
            <div className="drp_large">

              {
                token &&  <NotificationBell />
              }
              

              <DropdownButton id="dropdown-basic-button" className="ms_top_btn"
                title={
                  <>
                    <div className="d-flex align-items-center gap-1"> 
                      {language}
                      <ArrowDropDownIcon />
                    </div>

                  </>
                }
                onSelect={handleLanguageChange} >

                <Dropdown.Item eventKey="English" >English</Dropdown.Item>
                <Dropdown.Item eventKey="Gujarati">Gujarati</Dropdown.Item>
              </DropdownButton>
              {
                token ?
                  (
                    <>
                      <BasicMenu />
                    </>
                  )
                  :
                  (
                    <button className="header_login_btn" onClick={handleLoginSignup}>Login/Sign Up</button>
                  )
              }
            </div>

            <div className="drp_small">

              <div className="d-flex align-items-center gap-2">
              {
                token && <NotificationBell />
              }
                
                <IconButton
                  aria-controls="menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                  variant="contained"
                  className="three_dot_btn"
                >
                  <MoreVertIcon />
                </IconButton>
              </div>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {token ? (
                  <MenuItem>

                    <BasicMenu />

                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLoginSignup}>Login/Sign Up</MenuItem>
                )}
                <MenuItem>
                  <DropdownButton
                    id="dropdown-basic-button"
                    className="ms_top_btn"
                    title={
                      <>
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center gap-2">

                            <span>{language}</span>
                          </div>

                          <ArrowDropDownIcon />
                        </div>

                      </>
                    }
                    onSelect={handleLanguageChange}
                  >
                    <Dropdown.Item eventKey="English">English</Dropdown.Item>
                    <Dropdown.Item eventKey="Gujarati">Gujarati</Dropdown.Item>
                  </DropdownButton>
                </MenuItem>
              </Menu>
            </div>




            {/* <Dropdown className="drp_small">
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="three_dot_btn">
                button
              </Dropdown.Toggle>
              <Dropdown.Menu>
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

                <DropdownButton id="dropdown-basic-button" className="ms_top_btn" title={language} onSelect={handleLanguageChange} >
                  <Dropdown.Item eventKey="English" >English</Dropdown.Item>
                  <Dropdown.Item eventKey="Gujarati">Gujarati</Dropdown.Item>
                </DropdownButton>

              </Dropdown.Menu>
            </Dropdown> */}

          </div>
        </div>

        <LoginModel show={isLoginModalVisible} onHide={() => setIsLoginModalVisible(false)} onRegisterClick={handleRegisterClick} onForgotPasswordClick={handleForgotPasswordClick} />

        <RegisterModal show={isRegisterModalVisible} onHide={() => setIsRegisterModalVisible(false)} onLoginClick={handleLoginClick} />

        <ForgotPasswordModal show={isForgotPasswordVisible} onLoginClick={handleLoginClick} onHide={() => setIsForgotPasswordVisible(false)} />

      </div>

    </>
  )
}

export default Header
