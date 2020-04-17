import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import StoreListing from "../components/StoreListing/StoreListing";
import StoreCategories from "../components/StoreListing/StoreCategories";
import config from "../../data/SiteConfig";


export default class CategoryTemplate extends React.Component {
  render() {
    const { category, allCategories } = this.props.pageContext;
    const productEdges = this.props.data.allMarkdownRemark.edges;
    console.log(this.props.pageContext);
    console.log(productEdges);
    return (
      <Layout>
        <div className="category-container">
          <Helmet
            title={`Posts in category "${category}" | ${config.siteTitle}`}
          />
          <h1 className="text-center text-3xl mb-4">{category}</h1>
          <div className="text-center mb-12">
            <p>
              All prints are premium quality inkjet prints and are printed on
              archival fine art paper – touting gallery quality and outstanding
              color.
            </p>
            <p>
              <strong>As of March 16th - May 15th 15% of all proceeds will be donated to
              No Kid Hungry</strong>
            </p>
          </div>
          <StoreCategories categories={allCategories} active_category={category} />
          <StoreListing products={productEdges} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: [String]) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { category: { in: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 700, maxHeight: 700, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            sizes {
              image {
                childImageSharp {
                  fluid(maxWidth: 600, maxHeight: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
                publicURL
              }
              size
              price
            }
          }
        }
      }
    }
  }
`;
