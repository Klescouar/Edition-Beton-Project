import { ArticleActionTypes, Articles } from "../types/articles";

type ArticlesState = Articles;

const initialState: ArticlesState = [];

export default (
  state: ArticlesState = initialState,
  action: ArticleActionTypes
) => {
  switch (action.type) {
    case "ADD_ARTICLE_SUCCESS":
    case "GET_ARTICLES_SUCCESS":
    case "REMOVE_ARTICLE_SUCCESS":
    case "UPDATE_ARTICLE_SUCCESS":
      return action.payload;
    case "REMOVE_ARTICLE_FAILURE":
    case "GET_ARTICLES_FAILURE":
    case "ADD_ARTICLE_FAILURE":
    case "UPDATE_ARTICLE_FAILURE":
    default:
      return state;
  }
};
