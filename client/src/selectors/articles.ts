import { State } from "types/state";
import { Articles, Article } from "types/articles";
import { createSelector } from "reselect";

export const getArticles = (state: State): Articles => state.articles;

export const getArticle = (id: string) => {
  return createSelector(getArticles, (articles: Articles):
    | Article
    | undefined => articles.find((article) => article._id === id));
};
