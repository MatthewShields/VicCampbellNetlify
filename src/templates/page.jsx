import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import FlexibleContent from "../components/FlexibleContent/FlexibleContent";
import Hero from "../components/Hero/Hero";

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;

    return (
      <Layout>
        <div>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <Hero title={post.title} description={post.short_description} cover={postNode.frontmatter.cover} />
          <div className="content-section">
            <FlexibleContent sections={postNode.frontmatter.sections} />
          </div>
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

  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        short_description
        date
        cover {
          childImageSharp {
            fluid(maxHeight: 700, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
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
  }
`;
