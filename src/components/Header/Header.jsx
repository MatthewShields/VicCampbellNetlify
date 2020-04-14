import React, { Component } from "react";
import { Link } from "gatsby";
import Headroom from "react-headroom";
import YAMLData from "../../../data/settings/navigation.yml"
import "./Header.css";
import yourSVG from '../../../static/theme_images/matthew-shields.svg'

class Header extends Component {
  constructor(props) {
      super(props);

      this.state = {
        menuOpen: false,
      }

      this.toggle_menu = this.toggle_menu.bind(this);
      this.restore_body = this.restore_body.bind(this);
  }

  componentDidMount() {
  }

  toggle_menu() {
    document.body.classList.toggle('overflow-hidden');
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  restore_body() {
    document.body.classList.remove('overflow-hidden');
    this.setState({
      menuOpen: false
    });
  }

  render() {
    const { config } = this.props;
    const url = config.siteRss;

    let logo_classes = 'header__title';

    // if(this.props.homepage !== true) {
    //   logo_classes = 'header__title';
    // } else {
    //   logo_classes = 'header__title header__title--hidden';
    // }

    let headerClass = '';
    let buttonText = 'Open Menu';

    if(this.state.menuOpen === true) {
      headerClass = 'menu--open';
      buttonText = 'Close Menu';

    }
    
    return (
      <Headroom className={headerClass}>
        <header className="header">
          <h1 className={logo_classes}>
            <Link to="/">
                <img src={yourSVG} alt="Matthew Shields Logo" />
            </Link>
          </h1>
          <nav>
            <button className="menu-button" onClick={this.toggle_menu}>{buttonText}</button>
            <ul className="main-nav">
              {YAMLData.nav_items.map((data, index) => {
                return (
                  <li key={`content_item_${index}`} className="main-nav__item">
                    <Link onClick={this.restore_body} to={data.path}>
                      {data.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
      </Headroom>
    );
  }
}

export default Header;