const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug = "";

  if (node.internal.type === "MarkdownRemark") {
    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString(),
        });
      }

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        slug = node.frontmatter.slug;
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.js");
  const tagPage = path.resolve("src/templates/tag.js");
  const categoryPage = path.resolve("src/templates/category.js");

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark(filter: { fields: { draft: { eq: false } } }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                categories
                date
              }
            }
          }
        }
      }
    `
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateB.isBefore(dateA)) return 1;
    if (dateA.isBefore(dateB)) return -1;

    return 0;
  });

  postsEdges.forEach((edge, index) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.categories) {
      edge.node.frontmatter.categories.forEach((category) => {
        categorySet.add(category);
      });
    }

    const nextID = index + 1 < postsEdges.length ? index + 1 : -1;
    const prevID = index - 1 >= 0 ? index - 1 : -1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge ? nextEdge.node.frontmatter.title : null,
        nextslug: nextEdge ? `/${nextEdge.node.fields.slug}` : null,
        prevtitle: prevEdge ? prevEdge.node.frontmatter.title : null,
        prevslug: prevEdge ? `/${prevEdge.node.fields.slug}` : null,
      },
    });
  });
  // Generate link foreach tag page
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    });
  });
  // Generate link foreach category page
  categorySet.forEach((category) => {
    createPage({
      path: `/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  switch (stage) {
    case "build-javascript":
    case "build-html":
      // Turn off source maps in production
      actions.setWebpackConfig({
        devtool: false,
      });
      break;
    case "develop":
    case "develop-html":
      // Enable source maps in development
      actions.setWebpackConfig({
        devtool: `cheap-module-source-map`,
      });
      break;
    default:
      break;
  }
};
