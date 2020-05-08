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
    console.log(data);
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;

    return (
      <Layout>
        <div>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <h1 className="text-center text-3xl mb-4">{post.title}</h1>
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

  fragment CarouselPage on Sections {
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

  fragment TextBlockPage on Sections {
    type
    title
    text
  }

  fragment MultiColumnPage on Sections {
    type
    title
    col_num
    columns {
      title
      text
    }
  }

  fragment BlockListPage on Sections {
    type
    title
    text
    blocks {
      title
      text
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
        sections {
          ...TextBlockPage
          ...CarouselPage
          ...BlockListPage
          ...MultiColumnPage
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;
