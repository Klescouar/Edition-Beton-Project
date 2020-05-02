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
  const result = await axios.get("http://localhost:4444/articles");

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
  const result = await axios.get("http://localhost:4444/categories");

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

  return;
}

async function generateLogo({ createNode, createNodeId, createContentDigest }) {
  const result = await axios.get("http://localhost:4444/logo");

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

  return;
}

async function generateAbout({
  createNode,
  createNodeId,
  createContentDigest,
}) {
  const result = await axios.get("http://localhost:4444/about");

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

  return;
}

module.exports = {
  generateAbout,
  generateArticles,
  generateCategories,
  generateLogo,
};
