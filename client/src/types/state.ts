import { Articles } from "./articles";
import { RegisterData } from "./register";

export interface State {
  articles: Articles;
  authentication: {
    isAuthenticated: boolean;
    authenticationError: string;
    isLoading: boolean;
    authenticationInfo: {
      token: string;
      username: string;
    };
  };
  register: {
    registerInfo: RegisterData;
    registerError: string;
  };
}
