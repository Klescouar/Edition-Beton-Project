import { Article } from "types/articles";
import { State } from "types/state";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

const fakeRequest = (article: Article) => {
  return Promise.resolve({
    id: article.id,
    title: article.title,
    image: article.image,
  });
};

export const addArticle = (
  article: Article
): ThunkAction<void, State, unknown, Action> => async (dispatch) => {
  const result = await fakeRequest(article);
  dispatch({ type: "ADD_ARTICLE_SUCCESS", payload: result });
};
