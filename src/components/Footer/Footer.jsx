import React, { Component } from "react";
import { Link } from "gatsby";
import UserLinks from "../UserLinks/UserLinks";
import "./Footer.css";

class Footer extends Component {
  render() {
    const { config } = this.props;
    const url = config.siteRss;
    return (
      <footer aria-label="Main footer" className="footer">
        <UserLinks config={config} labeled />
        <p>
          <img src="https://api.netlify.com/api/v1/badges/c023a493-a603-4019-9652-8d104b5d36b2/deploy-status" alt="Netlify Build Status"/>
        </p>
      </footer>
    );
  }
}

export default Footer;
