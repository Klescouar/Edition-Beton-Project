import { Articles, ChatActionTypes } from "types/articles";

interface State {
  articles: Articles;
}

export default (state: State, action: ChatActionTypes) => {
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
