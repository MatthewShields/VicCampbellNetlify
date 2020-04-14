import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import Hero from "../components/Hero/Hero";
import "../styles/b16-tomorrow-dark.css";
import "./post.css";

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
          <Hero title={post.title} description={post.short_description} cover={postNode.frontmatter.cover} date={postNode.frontmatter.date} readingTime={postNode.timeToRead} />
          <div className="content-section post-content">
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        social_image {
          childImageSharp {
            fluid(maxHeight: 700, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;
