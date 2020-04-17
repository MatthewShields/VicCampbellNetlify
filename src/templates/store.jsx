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
    console.log(productEdges);
    return (
      <Layout>
        <div className="category-container">
          <Helmet
            title={`Posts in print store | ${config.siteTitle}`}
          />
          <h1 className="text-center text-3xl mb-4">Print Store</h1>
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
          <div className="my-10">
            <p className="text-center">Do you live in MN? A selection of my prints can also be found in The Golden Rule, Excelsior Minnesota</p>
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query StorePage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {fileAbsolutePath: {regex: "/(products)/.*\\.md$/"}}
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
                fluid(maxHeight: 700, maxWidth: 700, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            sizes {
              price
            }
          }
        }
      }
    }
  }
`;
