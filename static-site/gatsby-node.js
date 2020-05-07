/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require("dotenv").config();
const path = require("path");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

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

exports.onCreateNode = async ({ node, actions, getCache, createNodeId }) => {
  const { createNodeField, createNode } = actions;
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

  if (["ArticleType", "LogoType", "AboutType"].includes(node.internal.type)) {
    const imageUrl = `${process.env.API_URL}/medias/${node.url}`;
    createNodeField({ node, name: "imageUrl", value: imageUrl });
    try {
      const fileNode = await createRemoteFileNode({
        url: imageUrl,
        parentNodeId: node.id,
        getCache,
        createNode,
        createNodeId,
      });

      if (fileNode) {
        node.image = fileNode.id;
      }
    } catch (err) {
      console.error(err);
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type ArticleType implements Node {
      id: ID!
      # create a relationship between Article and the File nodes for optimized images
      image: File @link
    }

    type LogoType implements Node {
      id: ID!
      # create a relationship between Article and the File nodes for optimized images
      image: File @link
    }

    type AboutType implements Node {
      id: ID!
      # create a relationship between Article and the File nodes for optimized images
      image: File @link
    }
    `);
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
      component: path.resolve(`./src/templates/category.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        name: node.name,
      },
    });
  });
};
