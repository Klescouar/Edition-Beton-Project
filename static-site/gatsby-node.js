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

  if (["ArticleType", "LogoType"].includes(node.internal.type)) {
    const imageUrl = `https://virgile.s3.eu-west-3.amazonaws.com/${node.url}`;

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

  if (["AboutType"].includes(node.internal.type)) {
    const aboveImageUrl = `https://virgile.s3.eu-west-3.amazonaws.com/${node.aboveImage}`;
    const bottomImageUrl = `https://virgile.s3.eu-west-3.amazonaws.com/${node.bottomImage}`;
    console.log(node.bottomImage);
    createNodeField({ node, name: "aboveImage", value: aboveImageUrl });
    createNodeField({ node, name: "bottomImage", value: bottomImageUrl });

    try {
      const fileNode = await createRemoteFileNode({
        url: aboveImageUrl,
        parentNodeId: node.id,
        getCache,
        createNode,
        createNodeId,
      });

      if (fileNode) {
        node.aboveImage = fileNode.id;
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const fileNode = await createRemoteFileNode({
        url: bottomImageUrl,
        parentNodeId: node.id,
        getCache,
        createNode,
        createNodeId,
      });

      if (fileNode) {
        node.bottomImage = fileNode.id;
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
      bottomImage: File @link
      aboveImage: File @link
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

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/admin/)) {
    page.matchPath = "/admin/*";
    // Update the page.
    createPage(page);
  }
};
