import { FaFlag, FaTransgenderAlt, FaUserAlt } from 'react-icons/fa'
import { MdEmail, MdTempleBuddhist } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiFillEyeInvisible } from "react-icons/ai";
import Link from 'next/link';

const Register = () => {
    return (
        <div className='login_container'>
            <div className='register_heading'>
                <h2>Register</h2>
                <p>Please enter details to register</p>
            </div>

            <form className="form_container">
                <div className="input_container">
                    <input type="text" placeholder="First Name" />
                    <FaUserAlt id="icon" />
                </div>

                <div className="input_container">
                    <input type="text" placeholder="Last Name" />
                    <FaUserAlt id="icon" />
                </div>
                <div className="input_container">
                    <select name="gender" id="gender" >
                        <option value="" disabled selected hidden>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <FaTransgenderAlt id="icon" />
                </div>

                <div className="input_container">
                    <input type="email" placeholder="Email" />
                    <MdEmail id="icon" />
                </div>

                <div className="input_container">
                    <select name="country" id="country" >
                        <option value="" disabled selected hidden>Country</option>
                        <option value="india">India</option>
                        <option value="pakistan">Pakistan</option>
                    </select>
                    <FaFlag id="icon" />
                </div>
                <div className="input_container">
                    <select name="temple" id="temple" >
                        <option value="" disabled selected hidden>Temple</option>
                        <option value="">India</option>
                        <option value="">Pakistan</option>
                    </select>
                    <MdTempleBuddhist id="icon" />
                </div>

                <div className="input_container">
                    <input type="password" placeholder="Password" />
                    <RiLockPasswordFill id="icon" />
                    <AiFillEyeInvisible className="eye_icon"  />
                </div>
                <div className="input_container">
                    <input type="password" placeholder="Repeat Password" />
                    <RiLockPasswordFill id="icon" />
                    <AiFillEyeInvisible className="eye_icon" />
                </div>

                <button className="btn_login">Save</button>
                <p className="account">{"Already have an account ?"} <Link href='/login' >Login</Link></p>
            </form>
        </div>
    )
}

export default Register