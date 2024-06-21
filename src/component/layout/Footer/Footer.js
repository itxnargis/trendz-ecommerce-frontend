import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="appstore" />
            </div>

            <div className="midFooter">
                <h1>Ecommerce</h1>
                <p>Hight quality is our first priority</p>
                <p>Copyright 2024 &copy; Nargis </p>

            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="mailto:itxnargiskhatun@gmail.com" title="My gmail account"
                    aria-label="Gmail-icon" id="iconLink">
                    GMail
                </a>

                <a href="https://github.com/itxnargis" title="Connect to github"
                    aria-label="Github-icon" id="iconLink">
                    Github
                </a>

                <a href="https://x.com/81283nargis?s=09" title="My personal twitter account"
                    aria-label="Twitter-icon" id="iconLink">
                    Twitter
                </a>

                <a href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/"
                    title="My linkedin account" aria-label="Linkedin-icon" id="iconLink">
                    Linkedin
                </a>
            </div>

        </footer>
    );
};

export default Footer;