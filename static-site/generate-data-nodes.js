require("dotenv").config();
const axios = require("axios");

function formatArticle({ article, createNodeId, createContentDigest }) {
  const nodeContent = JSON.stringify(article);

  const nodeMeta = {
    id: createNodeId(`Article-${article._id}`),
    parent: null,
    children: [],
    internal: {
      type: "ArticleType",
      mediaType: "application/json",
      content: nodeContent,
      contentDigest: createContentDigest(article),
    },
  };

  return { ...article, ...nodeMeta };
}

async function generateArticles({
  createNode,
  createNodeId,
  createContentDigest,
}) {
  try {
    console.log(`Fetching articles at ${process.env.API_URL}/articles`);
    const result = await axios.get(`${process.env.API_URL}/articles`);

    const articles = result.data;

    articles.forEach((article) =>
      createNode(
        formatArticle({
          article,
          createNodeId,
          createContentDigest,
        })
      )
    );

    console.log(`Generated ${articles.length} articles`);
  } catch (err) {
    console.error(err);
  }

  return;
}

function formatCategory({ category, createNodeId, createContentDigest }) {
  const nodeContent = JSON.stringify(category);

  const nodeMeta = {
    id: createNodeId(`Category-${category._id}`),
    parent: null,
    children: [],
    internal: {
      type: "CategoryType",
      mediaType: "application/json",
      content: nodeContent,
      contentDigest: createContentDigest(category),
    },
  };

  return { ...category, ...nodeMeta };
}

async function generateCategories({
  createNode,
  createNodeId,
  createContentDigest,
}) {
  try {
    console.log(`Fetching categories at ${process.env.API_URL}/categories`);
    const result = await axios.get(`${process.env.API_URL}/categories`);

    const categories = result.data;

    categories.forEach((category) =>
      createNode(
        formatCategory({
          category,
          createNodeId,
          createContentDigest,
        })
      )
    );

    console.log(`Generated ${categories.length} categories`);
  } catch (err) {
    console.error(err);
  }

  return;
}

async function generateLogo({ createNode, createNodeId, createContentDigest }) {
  try {
    console.log(`Fetching logo at ${process.env.API_URL}/logo`);
    const result = await axios.get(`${process.env.API_URL}/logo`);

    const logo = result.data;

    const nodeContent = JSON.stringify(logo);

    const nodeMeta = {
      id: createNodeId(`Logo-${logo._id}`),
      parent: null,
      children: [],
      internal: {
        type: "LogoType",
        mediaType: "application/json",
        content: nodeContent,
        contentDigest: createContentDigest(logo),
      },
    };

    createNode({ ...logo, ...nodeMeta });
  } catch (err) {
    console.error(err);
  }

  return;
}

async function generateAbout({
  createNode,
  createNodeId,
  createContentDigest,
}) {
  try {
    console.log(`Fetching about at ${process.env.API_URL}/about`);
    const result = await axios.get(`${process.env.API_URL}/about`);

    const about = result.data;

    const nodeContent = JSON.stringify(about);

    const nodeMeta = {
      id: createNodeId(`About-${about._id}`),
      parent: null,
      children: [],
      internal: {
        type: "AboutType",
        mediaType: "application/json",
        content: nodeContent,
        contentDigest: createContentDigest(about),
      },
    };

    createNode({ ...about, ...nodeMeta });
  } catch (err) {
    console.error(err);
  }

  return;
}

module.exports = {
  generateAbout,
  generateArticles,
  generateCategories,
  generateLogo,
};
