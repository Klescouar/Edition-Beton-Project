export interface Article {
  id: string;
  image: string;
  title: string;
}

export type Articles = Article[];

export interface AddArticleSuccessAction {
  type: string;
  payload: Article;
}

interface AddArticleFailureAction {
  type: string;
  payload: Article;
}

interface RemoveArticleAction {
  type: string;
  payload: Article;
}

export type ArticleActionTypes =
  | AddArticleSuccessAction
  | AddArticleFailureAction
  | RemoveArticleAction;
