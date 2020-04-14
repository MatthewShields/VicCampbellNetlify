import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import FlexibleContent from "../components/FlexibleContent/FlexibleContent";
import Hero from "../components/Hero/Hero";

const firepurchase = async event => {
  event.preventDefault()
  const data = {
    sku: '',
    quantity: '',
  };
  const response = await fetch('/.netlify/functions/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const stripe = Stripe(response.publishableKey);
  const { error } = await stripe.redirectToCheckout({
    sessionId: response.sessionId,
  });

}

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    console.log(data);
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;

    return (
      <Layout>
        <div>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <Hero title={post.title} description={post.short_description} cover={postNode.frontmatter.cover} />
          <button onClick={firepurchase}>
            BUY MY BOOK
          </button>
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

  query ProductBySlug($slug: String!) {
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
        sizes {
          image {
            childImageSharp {
              fluid(maxHeight: 700, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
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
  }
`;
