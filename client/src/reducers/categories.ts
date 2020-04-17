import { CategoriesActionTypes, Categories } from "types/categories";

type CategoriesState = Categories;

const initialState: CategoriesState = [];

export default (
  state: CategoriesState = initialState,
  action: CategoriesActionTypes
) => {
  switch (action.type) {
    case "ADD_CATEGORY_SUCCESS":
    case "GET_CATEGORIES_SUCCESS":
    case "REMOVE_CATEGORY_SUCCESS":
      return action.payload;
    case "REMOVE_CATEGORY_FAILURE":
    case "GET_CATEGORIES_FAILURE":
    case "ADD_CATEGORY_FAILURE":
    default:
      return state;
  }
};
