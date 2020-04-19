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
    let headerClass = 'mb-6 bg-white';
    let buttonText = 'Open Menu';

    if(this.state.menuOpen === true) {
      headerClass += ' menu--open';
      buttonText = 'Close Menu';

    }
    
    return (
      <Headroom className={headerClass}>
        <header className="py-3 bg-white transition-shadow duration-500 ease-in-out shadow-none">
          <h3 className="text-center text-4xl my-0 font-normal uppercase">
            <Link to="/">
              Victoria Campbell
            </Link>
          </h3>
          <p className="text-center mb-0 text-gray-500 uppercase text-xs">Minnesota Based Food and Lifestyle Photographer</p>
          <nav>
            <button className="md:hidden" onClick={this.toggle_menu}>{buttonText}</button>
            <ul className="main-nav flex justify-center list-none pl-0">
              {YAMLData.nav_items.map((data, index) => {
                return (
                  <li key={`content_item_${index}`} className="mx-4 mt-6">
                    <Link onClick={this.restore_body} to={data.path} className="hover:underline uppercase text-gray-700">
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