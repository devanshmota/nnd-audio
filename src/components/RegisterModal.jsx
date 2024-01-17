'use client'
import Modal from 'react-bootstrap/Modal';
import { MdOutlineEmail, MdPhone, MdTempleBuddhist } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaFlag, FaRegEyeSlash, FaTransgenderAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { Select } from 'antd';


import { getCountriesApi } from '@/redux/actions/Campaign';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const RegisterModal = ({ show, onHide, onLoginClick, ...props }) => {
    const [temples, setTemples] = useState([]);
    const [countries, setCountries] = useState([])
    const [formInfo, setFormInfo] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        country: '',
        temple: '',
        phoneNumber: '',
        password: '',
        repeatPassword: ''
    })

    useEffect(() => {

        getCountriesApi({
            onSuccess: (response) => {
                console.log('sucess')
                console.log(response)
                setCountries(response.data.data)

            },
            onError: (error) => {
                console.log('error')

                console.log(error);
            }
        });

    }, [])



    useEffect(() => {
        const fetchTemples = () => {
            const selectedCountry = countries.find((country) => country.name.toLowerCase() === formInfo.country.toLowerCase());
            if (selectedCountry) {
                axios.get(`https://nndaudioapp.mirzapar.com/api/get_temple?countries_id=${selectedCountry.id}`)
                    .then((response) => {
                        setTemples(response.data.data);
                    })
                    .catch((e) => {
                        console.log((e) => {
                            console.log(e)
                        })
                    })
            }
        };

        if (formInfo.country) {
            fetchTemples();
        } else {
            // Reset temples when no country is selected
            setTemples([]);
        }
    }, [formInfo.country, countries]);



    const handleLoginClick = () => {
        onLoginClick();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfo((prevFormInfo) => ({
            ...prevFormInfo,
            [name]: value,
        }));
    };
    const handleChangeSelect = (value, option) => {
        const name = option.name; // Assuming you set a 'name' property on the Option
        setFormInfo((prevFormInfo) => ({
            ...prevFormInfo,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted:', formInfo);
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
                    <form className="login_form" onSubmit={handleSubmit}>
                        <IoMdCloseCircle className="close_icon" onClick={onHide} />
                        <div className="header">
                            <h2>Register</h2>
                            <p>Please enter your details to register</p>
                        </div>
                        <div className="input_container">

                            <div className="input_with_icon">
                                <Input
                                    size='large'
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formInfo.firstName}
                                    onChange={handleChange}
                                    type="text"
                                    prefix={<FaUser />}
                                    required
                                />
                            </div>
                            {/* <div className="input_with_icon">
                            <FaUser className="all_icons" />
                            <input name='firstName' value={formInfo.firstName} onChange={handleChange} type="text" placeholder="First Name" required />
                        </div> */}
                            <div className="input_with_icon">

                                <Input
                                    type="text"
                                    name='lastName'
                                    value={formInfo.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    prefix={<FaUser />}
                                    required />
                            </div>
                            <div className="input_with_icon">
                                <Select
                                    name="gender"
                                    id="gender"
                                    value={formInfo.gender}
                                    onChange={handleChangeSelect}
                                    required
                                >
                                    <Option value="" disabled hidden>Select Gender</Option>
                                    <Option value="male" name="gender">Male</Option>
                                    <Option value="female" name="gender">Female</Option>
                                </Select>
                                <FaTransgenderAlt className="all_icons" />
                            </div>
                            <div className="input_with_icon">
                                <MdOutlineEmail className="all_icons" />
                                <input type="email" name='email'
                                    value={formInfo.email}
                                    onChange={handleChange} placeholder="Email" required />
                            </div>


                            <div className="input_with_icon">

                                <select name="country" id="country" value={formInfo.country} onChange={handleChange} required>
                                    <option value="" disabled selected hidden>Country</option>

                                    {
                                        countries.map((country) => (
                                            <option key={country.id} value={country.name.toLowerCase()} >{country.name}</option>
                                        ))
                                    }
                                </select>
                                <FaFlag className="all_icons" />
                            </div>
                            <div className="input_with_icon">
                                <select name="temple" id="temple" value={formInfo.temple}
                                    onChange={handleChange} disabled={!formInfo.country} required >
                                    <option value="" disabled selected hidden>Temple</option>
                                    {
                                        temples.length > 0 ? (
                                            <>

                                                {temples.map((temple) => (
                                                    <option key={temple.id} value={temple.name.toLowerCase()}>{temple.name}</option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value="nodata">No data found</option>
                                        )
                                    }


                                </select>
                                <MdTempleBuddhist className="all_icons" />
                            </div>

                            <div className="input_with_icon">
                                <MdPhone className="all_icons" />
                                <input type="tel" pattern='[0-9]{10}' placeholder="Phone Number" name='phoneNumber'
                                    value={formInfo.phoneNumber}
                                    onChange={handleChange} required />
                            </div>

                            <div className="input_with_icon">
                                <RiLockPasswordLine className="all_icons" />
                                <input type="password" placeholder="Password" name='password'
                                    value={formInfo.password}
                                    onChange={handleChange} required />
                                <FaRegEyeSlash className="eye_icon" />
                            </div>
                            <div className="input_with_icon">
                                <RiLockPasswordLine className="all_icons" />
                                <input type="password" placeholder="Repeat Password" name='repeatPassword'
                                    value={formInfo.repeatPassword}
                                    onChange={handleChange} required />
                                <FaRegEyeSlash className="eye_icon" />
                            </div>

                        </div>
                        <div className="btn_container">
                            <button type='submit'>Register</button>
                            <p>Already have an account? <span onClick={handleLoginClick}>Login</span></p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RegisterModal