import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import FlexibleContent from "../components/FlexibleContent/FlexibleContent";
import StoreListing from "../components/StoreListing/StoreListing";
import Hero from "../components/Hero/Hero";
import Img from "gatsby-image";

const firepurchase = async (image, name, description, amount, quantity) => {
  const data = {
    image: image,
    name: name,
    description: description,
    amount: amount,
    quantity: quantity,
    returnURL: window.location.href,
  };
  console.log(data);
  const response = await fetch("/.netlify/functions/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const stripe = Stripe(response.publishableKey);
  const { error } = await stripe.redirectToCheckout({
    sessionId: response.sessionId,
  });
};

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_product:
        props.data.markdownRemark.frontmatter.sizes &&
        props.data.markdownRemark.frontmatter.sizes.length > 0
          ? props.data.markdownRemark.frontmatter.sizes[0].size
          : false,
      quantity: 1,
    };

    this.change_selected_product = this.change_selected_product.bind(this);
    this.change_selected_quantity = this.change_selected_quantity.bind(this);
    this.change_selected_quantity = this.change_selected_quantity.bind(this);
  }

  change_selected_product(event) {
    this.setState({
      active_product: event.target.value,
      quantity: 1,
    });
  }

  change_selected_quantity(event) {
    if (!isNaN(event.target.value)) {
      this.setState({
        quantity: event.target.value,
      });
    } else {
      this.setState({
        quantity: this.state.quantity,
      });
    }
  }

  display_image(sizes, active_image) {
    if (active_image) {
      let image_found = false;
      sizes.forEach((size) => {
        if (size.size === active_image) {
          image_found = size;
        }
      });
      if (image_found === false) {
        return <Img fluid={sizes[0].image.childImageSharp.fluid} />;
      } else {
        return <Img fluid={image_found.image.childImageSharp.fluid} />;
      }
    }
  }

  image_url(sizes, active_image) {
    if (active_image) {
      let image_found = false;
      sizes.forEach((size) => {
        if (size.size === active_image) {
          image_found = size;
        }
      });
      if (image_found === false) {
        return window.location.origin + sizes[0].image.publicURL;
      } else {
        return window.location.origin + image_found.image.publicURL;
      }
    }
  }

  render() {
    const { data, pageContext } = this.props;
    console.log(data);
    console.log(pageContext);
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const relatedProducts = data.relatedProducts.edges;
    const post = postNode.frontmatter;

    return (
      <Layout>
        <div>
          <SEO postPath={slug} postNode={postNode} postSEO />
          {post.sizes && post.sizes.length > 0 ? (
            <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12">
              <div>
                {this.display_image(post.sizes, this.state.active_product)}
              </div>
              <div>
                <h1 className="mb-4 text-2xl">{post.title}</h1>
                <p>{post.short_description}</p>
                <div className="sm:grid sm:grid-cols-2 sm:gap-12 md:block lg:grid">
                  <div className="my-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Size
                    </label>
                    {post.sizes && post.sizes.length > 1 ? (
                      <div className="relative">
                        <select
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          name="product-sizes"
                          id="product-sizes"
                          onChange={this.change_selected_product}
                          value={this.state.active_product}
                        >
                          {post.sizes.map((size) => (
                            <option key={size.size}>{size.size}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <p className="w-full text-gray-700 py-3 leading-tight">{post.sizes[0].size}</p>
                    )}
                  </div>
                  <div className="my-6 w-full">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    Quantity
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="quantity"
                    type="number"
                    value={this.state.quantity}
                    onChange={this.change_selected_quantity}
                  />
                </div>
                </div>
                <button
                  className="bg-gray-900 hover:bg-blue-700 focus:bg-blue-700 text-white text-center py-4 px-8 block uppercase"
                  aria-label={`Purchase ${post.title} ${this.state.active_product}`}
                  onClick={() =>
                    firepurchase(
                      this.image_url(post.sizes, this.state.active_product),
                      post.title + " " + this.state.active_product,
                      post.short_description,
                      10000,
                      20
                    )
                  }
                >
                  Purchase
                </button>
              </div>
            </div>
          ) : false }

          <div className="max-w-screen-md mx-auto my-12">
            <FlexibleContent sections={postNode.frontmatter.sections} />
          </div>
          <StoreListing title="For your consideration" size="lg" products={relatedProducts} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  fragment Carousel on Sections {
    type
    title
    text
    images {
      single_image {
        childImageSharp {
          fluid(maxHeight: 700, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      alt
    }
  }

  fragment TextBlock on Sections {
    type
    title
    text
  }

  fragment BlockList on Sections {
    type
    title
    text
    blocks {
      title
      text
      footer_list {
        label
        value
      }
    }
  }

  query ProductBySlug($slug: String!, $category: [String]) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        short_description
        date
        image {
          childImageSharp {
            fluid(maxHeight: 700, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        sizes {
          image {
            childImageSharp {
              fluid(maxHeight: 600, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            publicURL
          }
          size
          price
        }
        sections {
          ...TextBlock
          ...Carousel
          ...BlockList
        }
      }
      fields {
        slug
        date
      }
    }
    relatedProducts: allMarkdownRemark(
      limit: 3
      filter: {frontmatter: { category: { in: $category } }, fields: {slug: {ne: $slug}}}
    ) {
      edges {
        node {
          frontmatter {
            title
            short_description
            date
            image {
              childImageSharp {
                fluid(maxHeight: 700, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            sizes {
              size
              price
            }
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`;
