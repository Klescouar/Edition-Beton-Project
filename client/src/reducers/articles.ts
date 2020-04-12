import { ArticleActionTypes, Articles } from "types/articles";

type ArticlesState = {
  articles: Articles;
};

const initialState = {
  articles: [],
};

export default (
  state: ArticlesState = initialState,
  action: ArticleActionTypes
) => {
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
