import { State } from "types/state";
import { Articles } from "types/articles";

export const getArticles = (state: State): Articles => state.articles;
