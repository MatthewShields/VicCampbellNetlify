import React, { Component } from "react";
import { Link } from "gatsby";
import UserLinks from "../UserLinks/UserLinks";
import "./Footer.css";

class Footer extends Component {
  render() {
    const { config } = this.props;
    const url = config.siteRss;
    return (
      <footer aria-label="Main footer" className="text-center mb-8">
        <p className="text-center uppercase text-sm">
          <a href="mailto:victoriajscampbell@gmail.com" className="hover:underline">victoriajscampbell@gmail.com</a>
        </p>
        <UserLinks config={config} labeled />
      </footer>
    );
  }
}

export default Footer;
