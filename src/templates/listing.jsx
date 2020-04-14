import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../layout";
import { Link } from "gatsby";
import PostListing from "../components/PostListing/PostListing";
import "../styles/pagination.css";

import { createMarkup } from "../_helpers/helpers.js";

class Listing extends React.Component {

  pagingLink(pageNum, currentPage) {
    switch(pageNum === currentPage) {
      case true:
        return (
          <span>{currentPage}</span>
        )
        break;
      default:
        return (
          <Link
            key={`listing-page-${pageNum}`}
            to={pageNum === 1 ? "/writing/" : `/writing/${pageNum}/`}
          >
            {pageNum}
          </Link>
        )
    }
  }

  renderPaging() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/writing/" : `/writing/${currentPageNum - 1}/`;
    const nextPage = `/writing/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;
    console.log(pageCount);

    return (
      <div className="paging-container">
        <div className="paging-controls">
          {!isFirstPage && <Link to={prevPage} className="paging-button">Previous</Link>}
        </div>

        <div className="paging-links">
          {[...Array(pageCount)].map((_val, index) => {
            const pageNum = index + 1;
            return (
              this.pagingLink(pageNum, currentPageNum)
            );
          })}
        </div>

        <div className="paging-controls">
          {!isLastPage && <Link to={nextPage} className="paging-button">Next</Link>}
        </div>
      </div>
    );
  }

  render() {
    const data = this.props.data;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const { currentPageNum, pageCount } = this.props.pageContext;
    const isFirstPage = currentPageNum === 1;

    return (
      <Layout>
        <div>
          <Helmet title={`Writing | Matthew Shields | Leeds based Web Developer`} />
          {isFirstPage && (
            <div className=" hero--noimg">
              <div className="hero__inner">
                <h1 className="hero__title" dangerouslySetInnerHTML={createMarkup('Writing')} />
                <div className="hero__description">
                  <p>I've spent many years learning so much through reading peoples blogs, it's time for me to give back and contribute.</p>
                </div>
              </div>
            </div>
          )}
          <div className="content-section">
            <div className="posts-container">
              <PostListing postEdges={postEdges} linkPage={true} displayReadingTime={true} />
            </div>
            {this.props.pageContext.pageCount > 1 &&
              this.renderPaging()
            }
          </div>
        </div>
      </Layout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "/(content/writing)/.*\\.md$/"}}
      limit: $limit
      skip: $skip
    ) {
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
            short_description
            date
          }
        }
      }
    }
  }
`;
