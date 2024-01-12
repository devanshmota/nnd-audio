'use client'

// import { Dropdown, Space, Typography } from 'antd';
import { FaUserAlt, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import MyModel from "./MyModel";

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

  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleLoginSignup = (e) => {
    e.preventDefault()
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="ms_header">
        {/* <div className="ms_top_left">
            <div className="ms_top_search">
              <input
                type="text"
                className="form-control"
                placeholder="Search Music Here.."
              />
              <span className="search_icon">
                <img src="images/svg/search.svg" alt="" />
              </span>
            </div>
            <div className="ms_top_trend">
              <span><a href="#" className="ms_color">Trending Songs :</a></span>
              <span className="top_marquee"
                ><a href="#"
                  >Dream your moments, Until I Met You, Gimme Some Courage, Dark
                  Alley (+8 More)</a
                ></span
              >
            </div>
          </div> */}
        <div className="ms_top_right">
          <div className="ms_top_lang">
          
          </div>
          <div className="ms_top_btn">
            <button className="header_login_btn" onClick={handleLoginSignup}>Login/Sign Up</button>
          </div>
        </div>
        {isModalVisible &&
          <MyModel show={isModalVisible} onclose={handleModalClose} />
        }
      </div>
      
    </>
  )
}

export default Header
