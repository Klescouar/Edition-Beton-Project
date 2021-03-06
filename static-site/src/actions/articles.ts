import { ThunkAction } from "redux-thunk";

import {
  PreSavedArticle,
  ArticleActionTypes,
  Article,
} from "../types/articles";
import { State } from "../types/state";
import API from "../utils/api";

export const addArticle = (
  article: PreSavedArticle
): ThunkAction<void, State, unknown, ArticleActionTypes> => async (
  dispatch
) => {
  try {
    const response = await API.post("/article", article);
    dispatch({
      type: "ADD_ARTICLE_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "ADD_ARTICLE_FAILURE" });
  }
};

export const updateArticle = (
  article: PreSavedArticle,
  id: string
): ThunkAction<void, State, unknown, ArticleActionTypes> => async (
  dispatch
) => {
  try {
    const response = await API.put("/article", { ...article, _id: id });
    dispatch({
      type: "UPDATE_ARTICLE_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "UPDATE_ARTICLE_FAILURE" });
  }
};

export const removeArticle = (
  article: Article
): ThunkAction<void, State, unknown, ArticleActionTypes> => async (
  dispatch
) => {
  try {
    const response = await API.remove("/removeArticle", article);
    dispatch({
      type: "REMOVE_ARTICLE_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "REMOVE_ARTICLE_FAILURE" });
  }
};

export const getArticles = (): ThunkAction<
  void,
  State,
  unknown,
  ArticleActionTypes
> => async (dispatch) => {
  try {
    const response = await API.get("/articles");
    dispatch({
      type: "GET_ARTICLES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "GET_ARTICLES_FAILURE", payload: error.message });
  }
};
