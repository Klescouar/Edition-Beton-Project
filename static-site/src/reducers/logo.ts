import { LogoActionTypes, Logo } from "../types/logo";

type LogoState = Logo;

const initialState: LogoState = {
  _id: "",
  url: "",
};

export default (state: LogoState = initialState, action: LogoActionTypes) => {
  switch (action.type) {
    case "UPDATE_LOGO_SUCCESS":
    case "GET_LOGO_SUCCESS":
      return action.payload;
    case "UPDATE_LOGO_FAILURE":
    case "GET_LOGO_FAILURE":
    default:
      return state;
  }
};
