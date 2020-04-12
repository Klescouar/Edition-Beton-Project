import { combineReducers } from "redux";
import articles from "./articles";
import register from "./register";
import authentication from "./authentication";

export default combineReducers({
  articles,
  register,
  authentication,
});
