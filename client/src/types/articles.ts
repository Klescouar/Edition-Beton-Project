export interface preSavedArticle {
  url: string;
  title: string;
}

export interface Article {
  _id: string;
  url: string;
  title: string;
}

export type Articles = Article[];

interface AddArticleSuccessAction {
  type: "ADD_ARTICLE_SUCCESS";
  payload: Articles;
}

interface AddArticleFailureAction {
  type: "ADD_ARTICLE_FAILURE";
}

interface RemoveArticleSuccessAction {
  type: "REMOVE_ARTICLE_SUCCESS";
  payload: Articles;
}

interface RemoveArticleFailureAction {
  type: "REMOVE_ARTICLE_FAILURE";
}

interface GetArticlesSuccessAction {
  type: "GET_ARTICLES_SUCCESS";
  payload: Articles;
}

interface GetArticlesFailureAction {
  type: "GET_ARTICLES_FAILURE";
}

export type ArticleActionTypes =
  | AddArticleSuccessAction
  | AddArticleFailureAction
  | RemoveArticleSuccessAction
  | RemoveArticleFailureAction
  | GetArticlesSuccessAction
  | GetArticlesFailureAction;
