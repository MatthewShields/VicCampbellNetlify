import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./index.css";
import '../styles/main.css';
import '../styles/main-whitelist.css';

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="wrapper">
        <Header config={config} homepage={true} />
        <div className="container mx-auto pt-6">
          <Helmet>
            <meta name="description" content={config.siteDescription} />
            <html lang="en" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Helmet>
          {children}
        </div>
        <Footer config={config} />
      </div>
    );
  }
}
