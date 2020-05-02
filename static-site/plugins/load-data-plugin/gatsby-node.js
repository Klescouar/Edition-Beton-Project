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

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  await generateArticles({ createNode, createNodeId, createContentDigest });
  await generateLogo({ createNode, createNodeId, createContentDigest });

  return;
};
