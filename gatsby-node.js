/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const remark = require(`remark`)
const html = require(`remark-html`)


exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node);
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.jsx");
  const pagePage = path.resolve("src/templates/page.jsx");
  const albumPage = path.resolve("src/templates/album.jsx");
  const listingPage = path.resolve("./src/templates/listing.jsx");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              post_type
              title
              date
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const allPosts = markdownQueryResult.data.allMarkdownRemark.edges;

  var postsEdges = allPosts.filter(function(post) {
    return post.node.frontmatter.post_type === 'post';
  });

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Paging
  const { postsPerPage } = siteConfig;
  const pageCount = Math.ceil(postsEdges.length / postsPerPage);

  [...Array(pageCount)].forEach((_val, pageNum) => {
    createPage({
      path: pageNum === 0 ? `/writing/` : `/writing/${pageNum + 1}/`,
      component: listingPage,
      context: {
        limit: postsPerPage,
        skip: pageNum * postsPerPage,
        pageCount,
        currentPageNum: pageNum + 1
      }
    });
  });

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    // Generate a list of categories
    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug
      }
    });
  });

  var pageEdges = allPosts.filter(function(post) {
    return post.node.frontmatter.post_type === 'page';
  });

  // Post page creating
  pageEdges.forEach((edge, index) => {
    console.log('creating a page');
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    // Generate a list of categories
    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    // Create post pages
    const nextID = index + 1 < pageEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : pageEdges.length - 1;
    const nextEdge = pageEdges[nextID];
    const prevEdge = pageEdges[prevID];

    console.log(edge.node.fields.slug);

    createPage({
      path: edge.node.fields.slug,
      component: pagePage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug
      }
    });
  });

  var photographyEdges = allPosts.filter(function(post) {
    return post.node.frontmatter.post_type === 'photography';
  });
  // Photography pages creating
  photographyEdges.forEach((edge, index) => {

    // Create post pages
    const nextID = index + 1 < photographyEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : photographyEdges.length - 1;
    const nextEdge = photographyEdges[nextID];
    const prevEdge = photographyEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: albumPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug
      }
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createFieldExtension({
    name: "md",
    args: {
      sanitize: {
        type: "Boolean!",
        defaultValue: false,
      },
    },
    extend(options, prevFieldConfig) {
      return {
        args: {
          sanitize: "Boolean",
        },
        resolve(source, args, context, info) {
          const fieldValue = context.defaultFieldResolver(
            source,
            args,
            context,
            info
          )
          const shouldSanitize =
            args.sanitize != null ? args.sanitize : options.sanitize
          const processor = remark().use(html, { sanitize: shouldSanitize })
          return processor.processSync(fieldValue).contents
        },
      }
    },
  })


  const { createTypes } = actions
  const typeDefs = `

    type CarouselImages {
      single_image: File
      alt: String
    }

    type BlockFooterList {
      label: String
      value: String
    }
    
    type BlockList {
      title: String
      text: String @md
      footer_list: [BlockFooterList]
    }

    type Sections {
      type: String
      title: String
      text: String @md
      images: [CarouselImages]
      blocks: [BlockList]
    }

    type MarkdownRemarkFrontmatter implements Node {
      sections: [Sections]
    }

  `
  createTypes(typeDefs)
}