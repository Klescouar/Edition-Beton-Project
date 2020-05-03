import { useStaticQuery, graphql } from "gatsby";

export function useLogo() {
  const { logo } = useStaticQuery(graphql`
    query LogoQuery {
      logo: logoType {
        id
        url
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  return logo;
}
