import React from "react";
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5';
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import { FiArrowRightCircle } from 'react-icons/fi';
import Logo from "../../../images/Logo.jpeg";
import "./footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-nav">
                <div className="container">
                    <ul className="footer-nav-list">
                        <li className="footer-nav-item">
                            <h2 className="nav-title">Popular Categories</h2>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Fashion</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Electronic</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Cosmetic</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Health</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Watches</a>
                        </li>
                    </ul>
                    <ul className="footer-nav-list">
                        <li className="footer-nav-item">
                            <h2 className="nav-title">Contact</h2>
                        </li>
                        <li className="footer-nav-item flex">
                            <div className="icon-box">
                                <IoLocationOutline />
                            </div>
                            <address className="content">
                                Vedram Colony, Gali No. 8, Sehatpur, Faridabad, Haryana, 121003
                            </address>
                        </li>
                        <li className="footer-nav-item flex">
                            <div className="icon-box">
                                <IoMailOutline />
                            </div>
                            <a href="mailto:itxnargiskhatun@gmail.com" title="My gmail account"
                                aria-label="Gmail-icon" className="iconLink">
                                GMail
                            </a>
                        </li>
                    </ul>
                    <ul className="footer-nav-list">
                        <li className="footer-nav-item">
                            <h2 className="nav-title">Follow Me</h2>
                        </li>
                        <li>
                            <ul className="social-link">
                                <li className="footer-nav-item">
                                    <a href="https://github.com/itxnargis" title="Connect to github"
                                        aria-label="Github-icon" className="iconLink">
                                        <AiFillGithub /> Github
                                    </a>
                                </li>
                                <li className="footer-nav-item">
                                    <a href="https://x.com/81283nargis?s=09" title="My personal twitter account"
                                        aria-label="Twitter-icon" className="iconLink">
                                        <AiOutlineTwitter /> Twitter
                                    </a>
                                </li>
                                <li className="footer-nav-item">
                                    <a href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/"
                                        title="My linkedin account" aria-label="Linkedin-icon" className="iconLink">
                                        <AiFillLinkedin /> Linkedin
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <img src={Logo} alt="payment method" className="payment-img" />
                    <p className="copyright">
                        Copyright &copy; <a href="#">Ecommerce</a> all rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
