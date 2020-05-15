import { AboutType } from "../types/about";

import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout/Layout";
import BurnedUpImage from "../images/banniere-up_burned.png";

import "../styles/About.scss";

type Props = {
  data: { about: AboutType };
};

const About = ({ data }: Props) => {
  const { about } = data;
  console.log(about.description);
  return (
    <Layout>
      <div className="About">
        <img alt="" className="About__Image" src={BurnedUpImage} />
        <div
          className="About__Description"
          dangerouslySetInnerHTML={{
            __html: about.description,
          }}
        />
        {about.image?.childImageSharp?.fluid && (
          <Img
            fluid={about.image.childImageSharp.fluid}
            alt=""
            className="About__Image"
          />
        )}
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
