import React from "react";
import { graphql } from "gatsby";

import "../styles/About.scss";
import Layout from "../components/Layout/Layout";

const About = ({ data }) => {
  const { about } = data;

  return (
    <Layout>
      <div className="About">
        <img
          alt=""
          className="About__Image"
          src={`http://localhost:4444/medias/banniere-up_burned.png`}
        />
        <p
          className="About__Description"
          dangerouslySetInnerHTML={{ __html: about.description }}
        />
        <img
          alt=""
          className="About__Image"
          src={`http://localhost:4444/medias/${about.url}`}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query AboutQuery {
    about: aboutType {
      id
      description
      url
    }
  }
`;

export default About;
