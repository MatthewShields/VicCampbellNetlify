import React, { Fragment } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

function extract_price_range(sizes, sold_out) {
  if (sizes && sizes.length > 0) {
    let priceData = {
      low: false,
      high: false,
    };

    sizes.forEach((size) => {
      if(priceData.low === false || parseInt(size.price, 10) < priceData.low ) {
        priceData.low = parseInt(size.price);
      }
      if(priceData.high === false || parseInt(size.price) > priceData.high) {
        priceData.high = parseInt(size.price);
      }
    });

    if(sold_out) {
      return (
        <p className="text-sm"><del>From: {(priceData.low / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</del> - Sold Out</p>
      );
    } else {
      return (
        <p className="text-sm">From: {(priceData.low / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
      );
    }
  } else {
    return false;
  }
}

class StoreListing extends React.Component {
  render() {
    let products = this.props.products;
    return (
      <Fragment>
        {Array.isArray(products) && products.length > 0 &&
          <div className={`mx-auto ${(this.props.size ? 'max-w-screen-'+this.props.size : false)}`}>
            {this.props.title &&
              <h3 className="mb-4 text-2xl text-center font-normal">{this.props.title}</h3>
            }
            <div className={`grid md:grid-cols-3 gap-6 lg:gap-12 invisible grid-hover`}>
              {products.map((product) => (
                <div className={`transition-opacity duration-500 ${(product.node.frontmatter.sold_out === true ? 'opacity-50' : false)}`}>
                  <Link to={`/print-store${product.node.fields.slug}`} className="text-center visible">
                    <Img
                      fluid={product.node.frontmatter.image.childImageSharp.fluid}
                    />
                    <h3 className="text-lg mt-4 mb-2 font-normal">{product.node.frontmatter.title}</h3>
                    {extract_price_range(product.node.frontmatter.sizes, product.node.frontmatter.sold_out)}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        }
      </Fragment>
    );
  }
}

export default StoreListing;
