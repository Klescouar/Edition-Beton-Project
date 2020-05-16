import { ArticlesType } from "../types/articles";

import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import Articles from "../components/Articles/Articles";

import "../styles/app.scss";

type Props = {
  data: ArticlesType;
};

const Home = ({ data }: Props) => {
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
          creationDate
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

export default Home;
