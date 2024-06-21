import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/itxnargis";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Nargis Khatun</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit Github
            </Button>
            <span>
              This is a sample wesbite made by @NargisKhatun. for practice.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Projects</Typography>
            <a
              href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/"
              target="blank"
            >
              <LinkedInIcon className="LinkedInSvgIcon" />
            </a>

            <a href="https://x.com/81283nargis?s=09" target="blank">
              <TwitterIcon className="TwitterSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;