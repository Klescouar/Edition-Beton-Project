import { Articles } from "./articles";
import { RegisterData } from "./register";
import { Categories } from "./categories";

export interface State {
  articles: Articles;
  categories: Categories;
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
