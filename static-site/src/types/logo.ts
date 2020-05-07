import { FluidObject } from "gatsby-image";

export interface Logo {
  id: string;
  url: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}
