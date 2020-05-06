module.exports = {
  siteMetadata: {
    title: "Les dessins de Virgile",
    description:
      "Virgile Veyron Guillemaud / Dessinateur drôlatique / Peintre en châtiment / ACAB",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
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
};
