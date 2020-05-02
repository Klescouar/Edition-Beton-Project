import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import Articles from "../components/Articles/Articles";

import "../styles/app.scss";

const Category = ({ data }) => {
  const articles = data.allArticleType.edges.map(({ node }) => node);

  return (
    <div className="App">
      <Layout>
        <Articles articles={articles} />
      </Layout>
    </div>
  );
};

export const query = graphql`
  query($name: [String]) {
    allArticleType(filter: { categories: { in: $name } }) {
      edges {
        node {
          id
          url
          title
        }
      }
    }
  }
`;

export default Category;
