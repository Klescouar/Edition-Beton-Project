import { combineReducers } from "redux";
import articles from "./articles";
import register from "./register";
import authentication from "./authentication";
import categories from "./categories";
import about from "./about";
import logo from "./logo";

export default combineReducers({
  articles,
  categories,
  register,
  authentication,
  about,
  logo,
});
