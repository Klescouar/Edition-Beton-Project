import { FluidObject } from "gatsby-image";

export interface PreSavedAbout {
  url: string;
  title: string;
  description: string;
}

export interface SavecAbout {
  _id: string;
  url: string;
  title: string;
  description: string;
}

interface UpdateAboutSuccessAction {
  type: "UPDATE_ABOUT_SUCCESS";
  payload: SavecAbout;
}

interface UpdateAboutFailureAction {
  type: "UPDATE_ABOUT_FAILURE";
}

interface GetAboutSuccessAction {
  type: "GET_ABOUT_SUCCESS";
  payload: SavecAbout;
}

interface GetAboutailureAction {
  type: "GET_ABOUT_FAILURE";
}

export type AboutActionTypes =
  | UpdateAboutSuccessAction
  | UpdateAboutFailureAction
  | GetAboutSuccessAction
  | GetAboutailureAction;

export interface About {
  _id: string;
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface AboutType extends About {
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}
