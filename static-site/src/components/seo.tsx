/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLogo } from "./useLogo";

type Props = {
  description: string;
  lang: string;
  meta: Array<{ name: string; content: string }>;
  title: string;
};

const SEO = ({ description, lang, meta, title }: Props) => {
  const logo = useLogo();
  console.log(logo);
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ]
        .concat([
          {
            property: "og:image",
            content: `https://virgile.s3.eu-west-3.amazonaws.com/${logo.url}`,
          },
          {
            property: "og:image:width",
            content: 600,
          },
          {
            property: "og:image:height",
            content: 600,
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ])
        .concat(meta)}
    />
  );
};

SEO.defaultProps = {
  description: "",
  lang: "fr",
  meta: [],
  title: "",
};

export default SEO;
