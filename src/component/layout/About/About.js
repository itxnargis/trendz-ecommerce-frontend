import React from "react";
import "./aboutSection.css";
import { Typography, Avatar } from "@material-ui/core";
import { FaGithub, FaEnvelope, FaTwitter, FaLinkedin } from "react-icons/fa";

const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/itxnargis";
  };

  return (
    <div className="aboutSection">
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>
        <div className="about-info">
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="" // Add your image source here
              alt="Founder"
            />
          </div>
          <Typography component="h4" className="intro-text">
            Hi, Myself
          </Typography>
          <Typography component="h2">Nargis Khatun</Typography>
          <Typography component="h3" className="bio">
            And I'm a <span>WEB DEVELOPER</span>
          </Typography>
          <Typography component="p" className="about-content">
            Aspiring frontend developer with expertise in <b>HTML, CSS</b>,
            JavaScript, Tailwind CSS, React, and C++. Currently pursuing a{" "}
            <b>Bachelor of Computer Applications (BCA)</b>. I'm passionate
            about crafting visually stunning and user-friendly web experiences.
            With a keen eye for detail and a commitment to delivering
            high-quality results, I'm eager to contribute to exciting projects
            and collaborate with fellow developers.
          </Typography>
          <div className="icons">
            <div className="social-icons">
              <a
                href="https://github.com/itxnargis"
                title="Connect to github"
                aria-label="Github-icon"
                id="iconLink"
              >
                <FaGithub />
              </a>
            </div>
            <div className="social-icons">
              <a
                href="mailto:itxnargiskhatun@gmail.com"
                title="My gmail account"
                aria-label="Gmail-icon"
                id="iconLink"
              >
                <FaEnvelope />
              </a>
            </div>
            <div className="social-icons">
              <a
                href="https://x.com/81283nargis?s=09"
                title="My personal twitter account"
                aria-label="Twitter-icon"
                id="iconLink"
              >
                <FaTwitter />
              </a>
            </div>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/"
                title="My linkedin account"
                aria-label="Linkedin-icon"
                id="iconLink"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="btn-container">
            <a href="CV.pdf" className="button">
              Resume <i className="fa fa-download"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
