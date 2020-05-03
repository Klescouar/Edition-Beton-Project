import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import Articles from "../components/Articles/Articles";

import "../styles/app.scss";

const Home = ({ data }) => {
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
  query HomePageQuery {
    allArticleType {
      edges {
        node {
          id
          title
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

export default Home;
