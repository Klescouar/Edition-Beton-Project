import { AuthenticationActionTypes } from "../types/authentication";
import Cookies from "js-cookie";

type AuthenticationState = {
  isAuthenticated: boolean;
  authenticationError: string;
  token: string;
  isLoading: boolean;
};

const initialState = {
  isAuthenticated: false,
  token: "",
  isLoading: true,
  authenticationError: "",
};

export default (
  state: AuthenticationState = initialState,
  action: AuthenticationActionTypes
) => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      Cookies.set("token", action.payload);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload,
        authenticationError: "",
      };
    case "AUTHENTICATION_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        authenticationError: action.payload,
      };
    case "AUTO_AUTHENTICATION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "AUTO_AUTHENTICATION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    case "AUTO_AUTHENTICATION_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
