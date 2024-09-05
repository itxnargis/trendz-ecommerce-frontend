import React from "react";
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5';
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import "./footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-nav">
                <div className="footer-container">
                    <ul className="footer-nav-list">
                        <li className="footer-nav-item">
                            <h2 className="nav-title">Popular Categories</h2>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Laptop</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Tops</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Bottom</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Camera</a>
                        </li>
                        <li className="footer-nav-item">
                            <a href="#" className="footer-nav-link">Watches</a>
                        </li>
                    </ul>
                    <ul className="footer-nav-list">
                        <li className="footer-nav-item">
                            <h2 className="nav-title">More Information</h2>
                        </li>
                        <li className="footer-nav-item">
                        <Link to="/" className="footer-nav-link">Home</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to="/products" className="footer-nav-link">Products</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to="/about" className="footer-nav-link">About</Link>
                        </li>
                        <li className="footer-nav-item">
                        <Link to="/contact" className="footer-nav-link">Contact</Link>
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
                                Faridabad, Haryana, Pin Code - 121003
                            </address>
                        </li>
                        <li className="footer-nav-item flex">
                            <div className="icon-box">
                                <IoMailOutline />
                            </div>
                            <a href="mailto:itxnargiskhatun@gmail.com" title="My gmail account"
                                aria-label="Gmail-icon" className="footer-nav-link link">itxnargiskhatun@gmail.com
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
                                        aria-label="Github-icon" className="footer-nav-link">
                                        <AiFillGithub />
                                    </a>
                                </li>
                                <li className="footer-nav-item">
                                    <a href="https://x.com/81283nargis?s=09" title="My personal twitter account"
                                        aria-label="Twitter-icon" className="footer-nav-link">
                                        <AiOutlineTwitter />
                                    </a>
                                </li>
                                <li className="footer-nav-item">
                                    <a href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/"
                                        title="My linkedin account" aria-label="Linkedin-icon" className="footer-nav-link">
                                        <AiFillLinkedin />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="copyright">
                        <p>
                            Copyright &copy; <a href="#">Trendz</a> all rights reserved.
                        </p>
                        <p>Designed by <span><a href="https://itxnargis.github.io/personal-portfolio/" title="my-personal-portfolio" target="_blank"
                            className="personal-info">
                            Nargis Khatun                                    </a></span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;