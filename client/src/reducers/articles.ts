import { Articles, ArticleActionTypes } from "types/articles";

interface State {
  articles: Articles;
}

export default (state: State, action: ArticleActionTypes) => {
  switch (action.type) {
    case "ADD_ARTICLE_SUCCESS":
      return {
        articles: [...state.articles, action.payload],
      };
    case "ADD_ARTICLE_FAILURE":
    default:
      return state;
  }
};
