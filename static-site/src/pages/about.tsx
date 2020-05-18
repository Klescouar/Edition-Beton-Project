import { AboutType } from "../types/about";

import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout/Layout";

import "../styles/About.scss";

type Props = {
  data: { about: AboutType };
};

const About = ({ data }: Props) => {
  const { about } = data;

  return (
    <Layout isAboutPage>
      <div className="About">
        {about.aboveImage?.childImageSharp?.fluid && (
          <Img
            className="About__Image"
            fluid={about.aboveImage.childImageSharp.fluid}
            alt=""
          />
        )}
        <div
          className="About__Description"
          dangerouslySetInnerHTML={{
            __html: about.description,
          }}
        />
        {about.bottomImage?.childImageSharp?.fluid && (
          <Img
            className="About__Image"
            fluid={about.bottomImage.childImageSharp.fluid}
            alt=""
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
      aboveImage {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      bottomImage {
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
