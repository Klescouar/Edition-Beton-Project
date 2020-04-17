import { State } from "types/state";
import { Categories } from "types/categories";

export const getCategories = (state: State): Categories => state.categories;
