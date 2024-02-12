'use client'
// import CryptoJS from "crypto-js";
import { MdOutlineEmail, MdPhone, MdTempleBuddhist } from "react-icons/md";
import { FaFlag, FaRegEyeSlash, FaTransgenderAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { getCountriesApi, getTemplesApi, getUserDetailsApi, logoutApi, updateProfileApi } from "@/redux/actions/Campaign";
import { useRouter } from "next/navigation";
import { auth } from "./Firebase";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/redux/reducer/UsersSlice";
import { getDecryptedText } from "@/decryption/decryption";


const GetProfile = () => {

    const { users } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const router = useRouter()
    const [countries, setCountries] = useState([])
    const [temples, setTemples] = useState([]);
    const [formInfo, setFormInfo] = useState({
        firstName: getDecryptedText(users.data.first_name),
        lastName: getDecryptedText(users.data.last_name),
        gender: getDecryptedText(users.data.gender),
        email: getDecryptedText(users.data.email),
        country: users.data.country.name,
        temple: users.data.temple.name,
        phoneNumber: getDecryptedText(users.data.mobile),
    });


    useEffect(() => {
        // console.log(formInfo.country)
        // console.log(formInfo.temple)
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfo((prevFormInfo) => ({
            ...prevFormInfo,
            [name]: value,
        }));
    };

    const handleLogout = () => {

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
                        if (res.error === false) {
                            dispatch(setUsers({}));
                            Swal.fire({
                                title: "Logout!",
                                text: "Logged out successfully",
                                icon: "success"
                            });
                            router.push('/')
                        }
                    },
                    onError: (e) => {
                        console.log(e)
                        toast.error(e)
                    }
                })

            }
        });

    };

    const handleSave = (e) => {
        e.preventDefault()
        const selectedTemple = temples.find((temple) => temple.name.toLowerCase() === formInfo.temple.toLowerCase());
        if (selectedTemple) {
            const temple_id = selectedTemple.id
            const countries_id = selectedTemple.country_id

            console.log(users)

            updateProfileApi({
                first_name: formInfo.firstName,
                last_name: formInfo.lastName,
                mobile: formInfo.phoneNumber,
                gender: formInfo.gender,
                country_id: countries_id,
                temple_id: temple_id,
                uid: users.data.uid,
                onSuccess: (res) => {
                    if (res.error === false) {
                        toast.success(res.message);
                        dispatch(setUsers({
                            ...users, data: {
                                ...res.data,
                                temple: { ...users.data.temple, ...res.data.temple },
                                country: { ...users.data.country, ...res.data.country },
                            }
                        }));
                    }
                },
                onError: (e) => {
                    toast.error('Save Failed')
                }
            })
        }
    }

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center form_wrapper">
                <form className="login_form" onSubmit={handleSave} >
                    <h2 className="text-center">Profile</h2>
                    <div className="input_container">
                        <div className="input_with_icon">
                            <FaUser className="all_icons" />
                            <input name='firstName' value={formInfo.firstName} onChange={handleChange} type="text" placeholder="First Name" required />
                        </div>
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
                        <div className="input_with_icon">
                            <MdEmail className="all_icons" />
                            <input type="email" name='email'
                                value={formInfo.email}
                                onChange={handleChange} placeholder="Email" readOnly={true} />
                        </div>


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

                        <div className="input_with_icon">
                            <MdPhone className="all_icons" />
                            <input type="tel" pattern='[0-9]{10}' placeholder="Phone Number" name='phoneNumber'
                                value={formInfo.phoneNumber}
                                onChange={handleChange} required />
                        </div>

                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleLogout}>Logout</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default GetProfile