import React from "react";
import Img from "gatsby-image";
import {
  createMarkup,
  format_paras,
  format_date,
} from "../../_helpers/helpers.js";

import "./Hero.css";
import "../../styles/post-meta.css";

class Hero extends React.Component {
  render() {
    let hero_class = "hero hero--noimg";
    let image_fluid = false;

    if (Array.isArray(this.props.cover) && this.props.cover.length > 0) {
      image_fluid = this.props.cover[0].photo.childImageSharp.fluid;
      hero_class = "hero";
    } else if (this.props.cover) {
      image_fluid = this.props.cover.childImageSharp.fluid;
      hero_class = "hero";
    } else {
      image_fluid = false;
    }

    return (
      <div className={hero_class}>
        <div className="mx-auto text-center my-8">
          <h1
            className="hero__title hero__title--post"
            dangerouslySetInnerHTML={createMarkup(this.props.title)}
          />
        </div>
        {image_fluid && (
          <div className="hero__image">
            <Img fluid={image_fluid} alt="" />
          </div>
        )}
      </div>
    );
  }
}

export default Hero;
