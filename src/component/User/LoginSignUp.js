import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("./Profile.png");
    const [registerError, setRegisterError] = useState("");
    const loginSubmit = (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setLoginError("Please fill in all fields");
            return;
        }
        dispatch(login(loginEmail, loginPassword));
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setRegisterError("Please fill in all fields");
            return;
        }
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        if (avatar) {
            myForm.append("avatar", avatar);
        } else {
            myForm.append("avatar", "");
        }
        dispatch(register(myForm));
    };
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

    const resetLoginFields = () => {
        setLoginEmail("");
        setLoginPassword("");
        setLoginError("");
    };
    const resetRegisterFields = () => {
        setUser({
            name: "",
            email: "",
            password: "",
        });
        setAvatar("");
        setAvatarPreview("./Profile.png");
        setRegisterError("");
    };

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
            registerTab.current.classList.remove("shiftToLeft");
            resetLoginFields();
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
            resetRegisterFields();
        }
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login-signup-toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>

                        <form className="login-form" ref={loginTab} onSubmit={loginSubmit}>
                            {loginError && <span className="error-message">{loginError}</span>}
                            <div className="login-email">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="login-password">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login" className="login-btn" />
                        </form>

                        <form
                            className="signup-form"
                            ref={registerTab}
                            encType="multipart/form-data"
                            onSubmit={registerSubmit}
                        >
                            {registerError && <span className="error-message">{registerError}</span>}
                            <div className="signup-name">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signup-email">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signup-password">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div id="register-image">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value="Register" className="signup-btn" />
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default LoginSignUp;
