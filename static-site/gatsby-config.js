const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = {
  siteMetadata: {
    title: "Les dessins de Virgile Veyron Guillemaud",
    description:
      "Virgile Veyron Guillemaud / Dessinateur drôlatique / Peintre en châtiment / ACAB",
    siteUrl: "https://www.lesdessinsdevirgile.com",
    keywords: [
      "Virgile Veyron Guillemaud",
      "dessins",
      "dessin",
      "bande dessinée",
      "actualité",
      "dessinateur",
      "Virgile",
      "Veyron",
      "Guillemaud",
    ],
    author: "Le Scouarnec Kevin & Matthis Duclos",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.lesdessinsdevirgile.com",
        sitemap: "https://www.lesdessinsdevirgile.com/sitemap.xml",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "les-dessins-de-virgile",
        short_name: "dessins-virgile",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/favicon.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
  proxy: [
    {
      prefix: "/api",
      url: "http://localhost:4444",
    },
    {
      prefix: "/medias",
      url: "http://localhost:4444",
    },
  ],
};
