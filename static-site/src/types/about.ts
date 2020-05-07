import { FluidObject } from "gatsby-image";

export interface AboutType {
  id: string;
  description: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}
