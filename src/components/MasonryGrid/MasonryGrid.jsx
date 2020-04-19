import React from "react";
import Img from "gatsby-image";

class MasonryGrid extends React.Component {
  render() {
    return (
      <div className=" mt-10">
        <div className="md:col-count-2 lg:col-gap-md lg:col-count-3 lg:col-gap-lg">
          <div className="avoid-break mb-12">
            <h2 className="mt-0">{this.props.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: this.props.text }} />
          </div>
          {this.props.images.map((img) => (
            <div className="avoid-break mb-12">
              <Img fluid={img.image.childImageSharp.fluid} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MasonryGrid;
