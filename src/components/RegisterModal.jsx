'use client'
import Modal from 'react-bootstrap/Modal';
import { MdOutlineEmail, MdPhone, MdTempleBuddhist } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaFlag, FaRegEyeSlash, FaTransgenderAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { getCountriesApi, getTemplesApi, postUserApi } from '@/redux/actions/Campaign';
import { auth } from './Firebase'
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

import toast from 'react-hot-toast';

const RegisterModal = ({ show, onHide, onLoginClick, ...props }) => {
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
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
            order: "asc",
            sort: "name",
            onSuccess: (response) => {
                setCountries(response.data)
            },
            onError: (error) => {
                console.log(error);
            }
        });

    }, [])

    useEffect(() => {

        if (formInfo.country) {
            const selectedCountry = countries.find((country) => country.name.toLowerCase() === formInfo.country.toLowerCase());
            if (selectedCountry) {

                getTemplesApi({
                    sort: "name",
                    order: "asc",
                    countries_id: selectedCountry.id,
                    limit: 250,
                    onSuccess: (response) => {

                        setTemples(response.data);
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                })
            }
        }
        else {
            setTemples([]);
        }
    }, [countries, formInfo.country]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleRepeatPasswordVisibility = () => {
        setRepeatPasswordVisible(!repeatPasswordVisible);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formInfo.password === formInfo.repeatPassword) {
            let newUser;
            auth.createUserWithEmailAndPassword(formInfo.email, formInfo.password)
                .then((auth) => {
                    newUser = auth.user;
                    auth.user.sendEmailVerification()
                        .then(() => {
                            const selectedTemple = temples.find((temple) => temple.name.toLowerCase() === formInfo.temple.toLowerCase());
                            if (selectedTemple) {
                                const temple_id = selectedTemple.id
                                const countries_id = selectedTemple.country_id
                                try {
                                    postUserApi({
                                        first_name: formInfo.firstName,
                                        last_name: formInfo.lastName,
                                        email: formInfo.email,
                                        mobile: formInfo.phoneNumber,
                                        gender: formInfo.gender,
                                        country_id: countries_id,
                                        temple_id: temple_id,
                                        uid: auth.user.uid,
                                        device_type: "web",
                                        fcm_id: "",
                                        onSuccess: (res) => {
                                            toast.success('Registration successful. Verification email sent.');
                                            clearFormData()
                                            onLoginClick()
                                        },
                                        onError: (e) => {
                                            toast.error(e.message)
                                            newUser.delete().catch((error) => {
                                                console.error('Error deleting user from Firebase:', error);
                                            });
                                        }
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            }

                        })
                        .catch(error => toast.error(error.message));
                })
                .catch(error => toast.error(error.message))
        }
        else {
            toast.error('Passwords do not match');
        }
    };

    const clearFormData = () => {
        setFormInfo({
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
    }

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
                    <form className="login_form register_form" onSubmit={handleSubmit}>
                        <IoMdCloseCircle className="close_icon" onClick={onHide} />
                        <div className="header">
                            <h2>Register</h2>
                            <p>Please enter your details to register</p>
                        </div>

                        <div className="input_container">
                            <div className="row gy-4">
                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <FaUser className="all_icons" />
                                        <input name='firstName' value={formInfo.firstName} onChange={handleChange} type="text" placeholder="First Name" required />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <FaUser className="all_icons" />
                                        <input
                                            type="text"
                                            name='lastName'
                                            value={formInfo.lastName}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                            required />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <FaTransgenderAlt className="all_icons" />
                                        <select
                                            name="gender"
                                            id="gender"
                                            value={formInfo.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled hidden>Select Gender</option>
                                            <option value="male" name="gender">Male</option>
                                            <option value="female" name="gender">Female</option>
                                        </select>

                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <MdOutlineEmail className="all_icons" />
                                        <input type="email" name='email'
                                            value={formInfo.email}
                                            onChange={handleChange} placeholder="Email" required />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input_with_icon">

                                        <select name="country" id="country" value={formInfo.country} onChange={handleChange} required>
                                            <option value="" disabled hidden>Country</option>

                                            {
                                                countries.map((country) => (
                                                    <option key={country.id} value={country.name.toLowerCase()} >{country.name}</option>
                                                ))
                                            }
                                        </select>
                                        <FaFlag className="all_icons" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <select name="temple" id="temple" value={formInfo.temple}
                                            onChange={handleChange} disabled={!formInfo.country} required >
                                            <option value="" disabled hidden>Temple</option>
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
                                </div>

                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <MdPhone className="all_icons" />
                                        <input type="tel" pattern='[0-9]{10}' placeholder="Phone Number" name='phoneNumber'
                                            value={formInfo.phoneNumber}
                                            onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <RiLockPasswordLine className="all_icons" />
                                        <input type={passwordVisible ? 'text' : 'password'} placeholder="Password" name='password'
                                            value={formInfo.password}
                                            onChange={handleChange} required />

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
                                </div>
                                <div className="col-sm-6">
                                    <div className="input_with_icon">
                                        <RiLockPasswordLine className="all_icons" />
                                        <input type={repeatPasswordVisible ? 'text' : 'password'} placeholder="Repeat Password" name='repeatPassword'
                                            value={formInfo.repeatPassword}
                                            onChange={handleChange} required />
                                        {repeatPasswordVisible ? (
                                            <FaRegEye
                                                className="eye_icon"
                                                onClick={toggleRepeatPasswordVisibility}
                                            />
                                        ) : (
                                            <FaRegEyeSlash
                                                className="eye_icon"
                                                onClick={toggleRepeatPasswordVisibility}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_container">
                            <button className='rgstr_btn' type='submit'>Register</button>
                            <p>Already have an account? <span onClick={handleLoginClick}>Login</span></p>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

        </>
    )
}

export default RegisterModal