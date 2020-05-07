import { ArticlesType } from "../types/articles";

import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import Articles from "../components/Articles/Articles";

import "../styles/app.scss";

type Props = {
  data: ArticlesType;
};

const Category = ({ data }: Props) => {
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
          title
          fields {
            imageUrl
          }
          image {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default Category;
