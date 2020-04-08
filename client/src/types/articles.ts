export const ADD_ARTICLE_SUCCESS = "ADD_ARTICLE_SUCCESS";
export const ADD_ARTICLE_FAILURE = "ADD_ARTICLE_FAILURE";
export const REMOVE_ARTICLE_SUCCESS = "REMOVE_ARTICLE_SUCCESS";

export interface Article {
  id: string;
  image: string;
  title: string;
}

export type Articles = Article[];

interface AddArticleSuccessAction {
  type: typeof ADD_ARTICLE_SUCCESS;
  payload: Article;
}

interface AddArticleFailureAction {
  type: typeof ADD_ARTICLE_FAILURE;
}

interface RemoveArticleAction {
  type: typeof REMOVE_ARTICLE_SUCCESS;
  payload: Article;
}

export type ChatActionTypes =
  | AddArticleSuccessAction
  | AddArticleFailureAction
  | RemoveArticleAction;
