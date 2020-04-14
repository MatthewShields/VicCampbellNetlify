import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Loadable from "react-loadable";
import Hero from "../components/Hero/Hero";

const LoadableBar = Loadable({
  loader: () => import("../components/Gallery/Gallery"),
  loading() {
    return <div>Loading...</div>;
  },
});

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      in_browser: false,
    };
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      this.setState({
        in_browser: true,
        gallery_width: window.innerWidth - 80,
      });
    }
  }

  render() {
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;

    console.log(postNode);

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${post.title} | ${config.siteTitle}`}</title>
          </Helmet>
          <Hero
            title={post.title}
            description={postNode.html}
            cover={postNode.frontmatter.cover_images}
          />
          {this.state.in_browser && (
            <LoadableBar images={postNode.frontmatter.images} />
          )}
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query AlbumPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        cover_images {
          photo {
            childImageSharp {
              fluid(maxHeight: 700, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
        images {
          photo {
            childImageSharp {
              grid: fluid(maxWidth: 450, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
              nongrid: fluid(maxHeight: 700, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
      }
    }
  }
`;
