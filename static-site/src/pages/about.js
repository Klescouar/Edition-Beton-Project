import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

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
        <Img
          fluid={about.image.childImageSharp.fluid}
          alt=""
          className="About__Image"
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
      image {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

export default About;
