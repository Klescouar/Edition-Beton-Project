import { Articles } from "./articles";
import { RegisterData } from "./register";
import { Categories } from "./categories";
import { About } from "./about";
import { Logo } from "./logo";

export interface State {
  articles: Articles;
  categories: Categories;
  logo: Logo;
  about: About;
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
