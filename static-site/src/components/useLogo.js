import { useStaticQuery, graphql } from "gatsby";

export function useLogo() {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: logoType {
        id
        url
      }
    }
  `);

  return data.logo;
}
