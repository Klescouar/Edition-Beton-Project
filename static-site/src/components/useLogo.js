import { useStaticQuery, graphql } from "gatsby";

export function useLogo() {
  const { logo } = useStaticQuery(graphql`
    query LogoQuery {
      logo: logoType {
        id
        url
        fields {
          imageUrl
        }
      }
    }
  `);

  return logo;
}
