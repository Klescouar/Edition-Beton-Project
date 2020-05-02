/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
const {
  generateArticles,
  generateCategories,
  generateLogo,
  generateAbout,
} = require("./generate-data-nodes");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  await Promise.all([
    generateArticles({ createNode, createNodeId, createContentDigest }),
    generateCategories({ createNode, createNodeId, createContentDigest }),
    generateLogo({ createNode, createNodeId, createContentDigest }),
    generateAbout({ createNode, createNodeId, createContentDigest }),
  ]);

  return;
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `CategoryType`) {
    const slug = node.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("-");

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      allCategoryType {
        edges {
          node {
            name
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  data.allCategoryType.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/category.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        name: node.name,
      },
    });
  });
};
