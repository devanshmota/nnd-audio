'use client'
import { MdOutlineEmail, MdOutlineTempleBuddhist} from "react-icons/md";
import { FaAngleDown, FaRegUser, FaTransgenderAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCountriesApi, getTemplesApi, updateProfileApi } from "@/redux/actions/Campaign";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/redux/reducer/UsersSlice";
import { getDecryptedText } from "@/decryption/decryption";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { IoFlagOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";


const GetProfile = () => {

    const { users } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const router = useRouter()
    const [countries, setCountries] = useState([])
    const [temples, setTemples] = useState([]);
    const [formInfo, setFormInfo] = useState({
        firstName: getDecryptedText(users?.data?.first_name),
        lastName: getDecryptedText(users?.data?.last_name),
        gender: getDecryptedText(users?.data?.gender),
        email: getDecryptedText(users?.data?.email),
        country: users?.data?.country?.name,
        temple: users?.data?.temple?.name,
        phoneNumber: getDecryptedText(users?.data?.mobile),
    });
    const [isLoading, setIsLoading] = useState(false);


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
                        if (response?.data?.length === 0) {
                            setFormInfo((prevFormInfo) => ({ ...prevFormInfo, temple: 'nodata' }))
                        }
                        else { }
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
        setFormInfo(prevFormInfo => ({
            ...prevFormInfo,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        setIsLoading(true)
        e.preventDefault()
        const selectedTemple = temples.find((temple) => temple.name.toLowerCase() === formInfo.temple.toLowerCase());

        if (selectedTemple) {
            const temple_id = selectedTemple?.id
            const countries_id = selectedTemple?.country_id

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
                        console.log(res)
                        dispatch(setUsers({
                            ...users, data: {
                                ...res.data,
                                temple: { ...res.data.temple },
                                country: { ...res.data.country },
                            }
                        }));
                    }
                    setIsLoading(false)
                },
                onError: (e) => {
                    toast.error(t('Save Failed'))
                    setIsLoading(false)
                }
            })
        }
        else {
            const selectedCountry = countries.find((country) => country.name.toLowerCase() === formInfo.country.toLowerCase());
            if (selectedCountry) {
                const countries_id = selectedCountry.id
                updateProfileApi({
                    first_name: formInfo.firstName,
                    last_name: formInfo.lastName,
                    mobile: formInfo.phoneNumber,
                    gender: formInfo.gender,
                    country_id: countries_id,
                    uid: users.data.uid,
                    onSuccess: (res) => {
                        if (res.error === false) {
                            toast.success(res.message);
                            console.log(res)
                            dispatch(setUsers({
                                ...users, data: {
                                    ...res.data,
                                    temple: { ...res.data.temple },
                                    country: { ...res.data.country },
                                }
                            }));
                        }
                    },
                    onError: (e) => {
                        toast.error(t('Save Failed'))
                    }
                })
            }
        }
    }

    const handleCancel = () => {
        router.push('/')
    }

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center form_wrapper">
                <form className="login_form w-75" onSubmit={handleSave} >
                    <h2 className="text-center">{t('Profile')}</h2>
                    <div className="row gap_field">
                        <div className="col-sm-12 col-md-6">
                            <div className="d-flex flex-column gap-1 w-100">
                                <label htmlFor="firstName">{t('First Name')}</label>
                                <div className="input_with_icon">

                                    <FaRegUser className="all_icons" />
                                    <input name='firstName' id="firstName" value={formInfo.firstName} onChange={handleChange} type="text" placeholder={t("Enter your first name")} required />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="d-flex flex-column gap-1 w-100">
                                <label htmlFor="lastName">{t('Last Name')}</label>
                                <div className="input_with_icon">
                                    <FaRegUser className="all_icons" />
                                    <input
                                        type="text"
                                        name='lastName'
                                        id="lastName"
                                        value={formInfo.lastName}
                                        onChange={handleChange}
                                        placeholder={t("Last Name")}
                                        required />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="d-flex flex-column gap-1 w-100">
                                <label htmlFor="gender">{t('Select Gender')}</label>
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
                                    <FaAngleDown className='down_Arrow' />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="d-flex flex-column gap-1 w-100">
                                <label htmlFor="email">{t('Email')}</label>
                                <div className="input_with_icon">
                                    <MdOutlineEmail className="all_icons" />
                                    <input
                                        type="email"
                                        name='email'
                                        id="email"
                                        value={formInfo.email}
                                        onChange={handleChange} placeholder={t("Email")} readOnly={true} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="d-flex flex-column gap-1 w-100">
                                <label htmlFor="country">{t('Country')}</label>
                                <div className="input_with_icon">

                                    <select name="country" id="country" value={formInfo.country} onChange={handleChange} required>
                                        <option value="" disabled hidden>
                                            Country
                                        </option>

                                        {
                                            countries.map((country) => (
                                                <option key={country.id} value={country.name} >{country.name}</option>
                                            ))
                                        }
                                    </select>
                                    <IoFlagOutline className="all_icons" />
                                    <FaAngleDown className='down_Arrow' />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="d-flex flex-column gap-1 w-100">
                                <label htmlFor="phoneNumber">{t('Phone Number')}</label>
                                <div className="input_with_icon">
                                    <FiPhone className="all_icons" />
                                    <input type="tel" pattern='[0-9]{10}' placeholder={t("Phone Number")} name='phoneNumber' id="phoneNumber"
                                        value={formInfo.phoneNumber}
                                        onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="d-flex flex-column gap-1 w-100">
                                <label htmlFor="temple">{t('Temple')}</label>
                                <div className="input_with_icon">
                                    <select name="temple" id="temple" value={formInfo.temple}
                                        onChange={handleChange} disabled={!formInfo.country} required >
                                        <option value="" hidden>Temple</option>

                                        {
                                            temples.length > 0 ? (
                                                <>

                                                    {temples.map((temple) => (
                                                        <option key={temple.id} value={temple.name}>{temple.name}</option>
                                                    ))}
                                                </>
                                            ) : (

                                                <option value="nodata">No data found</option>
                                            )
                                        }
                                    </select>
                                    <MdOutlineTempleBuddhist className="all_icons" />
                                    <FaAngleDown className='down_Arrow' />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <button type="submit" className="save_cancel_btn" disabled={isLoading} >
                                    {t('Save')}
                                </button>
                                <button type="button" className="save_cancel_btn" onClick={handleCancel}>{t('Cancel')}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withTranslation()(GetProfile)
