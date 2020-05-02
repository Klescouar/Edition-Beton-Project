import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import BurnedUpImage from "../images/banniere-up_burned.png";

import "../styles/About.scss";

const About = ({ data }) => {
  const { about } = data;

  return (
    <Layout>
      <div className="About">
        <img alt="" className="About__Image" src={BurnedUpImage} />
        <p
          className="About__Description"
          dangerouslySetInnerHTML={{ __html: about.description }}
        />
        <img alt="" className="About__Image" src={about.fields.imageUrl} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query AboutQuery {
    about: aboutType {
      id
      description
      fields {
        imageUrl
      }
    }
  }
`;

export default About;
