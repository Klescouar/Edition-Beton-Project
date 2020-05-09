import { AboutActionTypes, About } from "../types/about";

type AboutState = About;

const initialState: AboutState = {
  _id: "",
  url: "",
  title: "",
  description: "",
};

export default (state: AboutState = initialState, action: AboutActionTypes) => {
  switch (action.type) {
    case "UPDATE_ABOUT_SUCCESS":
    case "GET_ABOUT_SUCCESS":
      return action.payload;
    case "UPDATE_ABOUT_FAILURE":
    case "GET_ABOUT_FAILURE":
    default:
      return state;
  }
};
