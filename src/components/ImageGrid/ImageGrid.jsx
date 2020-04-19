import React, { Fragment } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

class ImageGrid extends React.Component {
  render() {
    let products = this.props.products;
    return (
      <Fragment>
        {Array.isArray(products) && products.length > 0 &&
          <div className={`mx-auto ${(this.props.size ? 'max-w-screen-'+this.props.size : false)}`}>
            {this.props.title &&
              <h3 className="mb-4 text-2xl text-center">{this.props.title}</h3>
            }
            <div className={`grid md:grid-cols-3 gap-6 lg:gap-12 invisible grid-hover`}>
              {products.map((product) => (
                <div className="transition-opacity duration-500">
                  <Link to={`/print-store${product.node.fields.slug}`} className="text-center visible">
                    <Img
                      fluid={product.node.frontmatter.image.childImageSharp.fluid}
                    />
                    <h3 className="text-lg mt-4">{product.node.frontmatter.title}</h3>
                    {extract_price_range(product.node.frontmatter.sizes)}
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

export default ImageGrid;
