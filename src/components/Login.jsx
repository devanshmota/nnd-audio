import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";


const Login = () => {

    return (
        <form className="login_form">
            <IoMdCloseCircle className="close_icon" />
            <div className="header">
                <h2>Login</h2>
                <p>Please enter your email and password</p>
            </div>
            <div className="input_container">

                <div className="input_with_icon">
                    <MdOutlineEmail className="email_icon" />
                    <input type="email" className="email_container" placeholder="Your Email" required />
                </div>
                <div className="input_with_icon">
                    <RiLockPasswordLine className="password_icon" />
                    <input type="password" placeholder="Password" required />
                    <FaRegEyeSlash className="eye_icon" />
                </div>
                <span className="forgot-password">Forgot Password?</span>
            </div>
            <div className="btn_container">
                <button>Login</button>
                <p>Don’t have any account? <span>Register</span></p>
            </div>
        </form>
    )
}

export default Login