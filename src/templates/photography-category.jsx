import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import ImageGrid from "../components/ImageGrid/ImageGrid";
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
          <div className="text-center mb-24 mx-auto max-w-screen-md">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa nulla veritatis beatae ullam quas repellendus praesentium corporis deserunt ab porro alias debitis voluptatum, dignissimos adipisci, dolor laborum minus hic! Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa nulla veritatis beatae ullam quas repellendus praesentium corporis deserunt ab porro alias debitis voluptatum.</p>
          </div>
          <ImageGrid images={productEdges} columns="2" />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PhotoCategoryPage($category: [String]) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
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
          }
        }
      }
    }
  }
`;
