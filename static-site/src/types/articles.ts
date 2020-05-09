import { FluidObject } from "gatsby-image";

export interface PreSavedArticle {
  url: string;
  title: string;
  categories: string[];
}

export interface Article {
  _id: string;
  url: string;
  title: string;
  categories: string[];
  creationDate: Date;
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

interface UpdateArticleSuccessAction {
  type: "UPDATE_ARTICLE_SUCCESS";
  payload: Articles;
}

interface UpdateArticleFailureAction {
  type: "UPDATE_ARTICLE_FAILURE";
}

export type ArticleActionTypes =
  | AddArticleSuccessAction
  | AddArticleFailureAction
  | RemoveArticleSuccessAction
  | RemoveArticleFailureAction
  | GetArticlesSuccessAction
  | GetArticlesFailureAction
  | UpdateArticleSuccessAction
  | UpdateArticleFailureAction;

export interface Article {
  id: string;
  title: string;
  creationDate: Date;
  fields: {
    imageUrl: string;
  };
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export type ArticlesType = {
  allArticleType: {
    edges: [
      {
        node: Article;
      }
    ];
  };
};

export type ArticlesListType = Article[];
