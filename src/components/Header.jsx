'use client'
import React, { useEffect, useState } from "react";
import LoginModel from "./LoginModel";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, setLanguageCode } from "@/redux/reducer/LanguageSlice";
import { Dropdown, DropdownButton } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BasicMenu from "./BasicMenu";
import NotificationBell from "./NotificationBell";
import GlobalSearch from "./Search";
import i18n from "@/utils/language";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";


const Header = ({ open, handleDrawerOpen }) => {

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const { language } = useSelector((state) => state.language)
  const { languageCode } = useSelector((state) => state.language)

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

  const handleLanguageChange = async (languageCode, languageName) => {
    dispatch(setLanguage(languageName));
    dispatch(setLanguageCode(languageCode))
    await i18n.changeLanguage(languageCode);
  };
  const setDefaultLanguage = async () => {
    await i18n.changeLanguage(languageCode);
  }


  return (
    <>
      <div className="ms_header">
        {/* <Image src={nnd_logo} alt="nnd_logo" className="nnd__vertical_logo" width={80} height={20} /> */}
        <div className="ms_top_right">
          <div className="ms_top_btn">
            <div className="drp_large">
              <GlobalSearch />
              {
                token && <NotificationBell />
              }
              <DropdownButton
                id="dropdown-basic-button"
                title={
                  <>
                    <div className="d-flex align-items-center gap-1">
                      {language}
                      <IoIosArrowDown />
                    </div>
                  </>
                }
              >
                <Dropdown.Item eventKey="English" onClick={() => handleLanguageChange("en", "English")}>
                  English
                </Dropdown.Item>
                <Dropdown.Item eventKey="Gujarati" onClick={() => handleLanguageChange("gu", "Gujarati")}>
                  Gujarati
                </Dropdown.Item>
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
                    <button className="header_login_btn" onClick={handleLoginSignup}>{t('Login/Sign Up')}</button>
                  )
              }
            </div>
            <div className="drp_small">

              <div className="d-flex align-items-center gap-2">
                <GlobalSearch />
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
                className="sm_menu"
              >
                {token ? (
                  <MenuItem>

                    <BasicMenu />

                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLoginSignup} className="text-white">{t('Login/Sign Up')}</MenuItem>
                )}
                <MenuItem>
                  <DropdownButton
                    id="dropdown-basic-button"
                    className="basic_menu"
                    title={
                      <>
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center gap-2">
                            <span>{language}</span>
                            <IoIosArrowDown />
                          </div>
                        </div>
                      </>
                    }
                  >
                    <Dropdown.Item eventKey="English" onClick={() => handleLanguageChange("en", "English")}>English</Dropdown.Item>
                    <Dropdown.Item eventKey="Gujarati" onClick={() => handleLanguageChange("gu", "Gujarati")}>Gujarati</Dropdown.Item>
                  </DropdownButton>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        <LoginModel show={isLoginModalVisible} onHide={() => setIsLoginModalVisible(false)} onRegisterClick={handleRegisterClick} onForgotPasswordClick={handleForgotPasswordClick} />
        <RegisterModal show={isRegisterModalVisible} onHide={() => setIsRegisterModalVisible(false)} onLoginClick={handleLoginClick} />
        <ForgotPasswordModal show={isForgotPasswordVisible} onLoginClick={handleLoginClick} onHide={() => setIsForgotPasswordVisible(false)} />
      </div>

    </>
  )
}

export default withTranslation()(Header)
