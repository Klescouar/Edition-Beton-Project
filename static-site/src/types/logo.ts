import { FluidObject } from "gatsby-image";

export interface PreSavedLogo {
  url: string;
}

interface UpdateLogoSuccessAction {
  type: "UPDATE_LOGO_SUCCESS";
  payload: Logo;
}

interface UpdateLogoFailureAction {
  type: "UPDATE_LOGO_FAILURE";
}

interface GetLogoSuccessAction {
  type: "GET_LOGO_SUCCESS";
  payload: Logo;
}

interface GetLogoFailureAction {
  type: "GET_LOGO_FAILURE";
}

export type LogoActionTypes =
  | UpdateLogoSuccessAction
  | UpdateLogoFailureAction
  | GetLogoSuccessAction
  | GetLogoFailureAction;

export interface Logo {
  id: string;
  url: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}
