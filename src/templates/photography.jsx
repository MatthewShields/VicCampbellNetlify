import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import FlexibleContent from "../components/FlexibleContent/FlexibleContent";
import Hero from "../components/Hero/Hero";

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    console.log(data);
    console.log(pageContext);
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;

    return (
      <Layout>
        <div>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <h1 className="text-center text-3xl mb-4 font-bold">{post.title}</h1>
          {postNode.html && postNode.html.length > 2 &&
            <div
              className="text-center mb-24 mx-auto max-w-screen-md"
              dangerouslySetInnerHTML={{ __html: postNode.html }}
            />
          }
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
  fragment CarouselPhoto on Sections {
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

  fragment TextBlockPhoto on Sections {
    type
    title
    text
  }

  fragment BlockListPhoto on Sections {
    type
    title
    text
    blocks {
      title
      text
    }
  }

  fragment MasonryGridPhoto on Sections {
    type
    title
    text
    images {
      image {
        childImageSharp {
          fluid(maxHeight: 700, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text
    }
  }

  query PhotographyPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        short_description
        body
        date
        sections {
          ...TextBlockPhoto
          ...CarouselPhoto
          ...BlockListPhoto
          ...MasonryGridPhoto
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;
