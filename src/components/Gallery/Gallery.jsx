import React, { Component } from "react";
import {Grid, GridItem} from 'react-masonry-grid';
import Img from "gatsby-image";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import "./Gallery.css";

class Gallery extends Component {
  
  constructor(props) {
      super(props);

      this.state = {
        gallery_width: 1200,
        images: props.images,
        photoIndex: 0,
        isOpen: false,
      }

  }

  componentDidMount() {

    if (typeof window !== 'undefined') {
      let layout_padding = 80;
      if(window.innerWidth < 800) {
        layout_padding = 40;
      }
      this.setState({
        in_browser: true,
        gallery_width: window.innerWidth - layout_padding
      });
    }
  }

  open_lightbox() {
    alert();
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    let gallery_column_width = this.state.gallery_width;

    if(window.innerWidth <= 600) {
      gallery_column_width = this.state.gallery_width;
    } else if(window.innerWidth <= 900) {
      gallery_column_width = (this.state.gallery_width) / 2;
    } else {
      gallery_column_width = (this.state.gallery_width - 60) / 3;
    }

    return (
      <div>
        <div className="grid-test">
          {this.props.images.map((image, index) => (
            <div key={image.photo.childImageSharp.grid.src}>
              <div onClick={() => this.setState({ photoIndex: index, isOpen: true })}>
                <Img fluid={image.photo.childImageSharp.grid} alt={image.alt} title={image.alt} imgStyle={{objectFit: 'contain'}} />
              </div>
            </div>
          ))}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={this.props.images[photoIndex].photo.childImageSharp.nongrid.src}
            nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length]}
            prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            imageLoadErrorMessage=""
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.props.images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}

export default Gallery;