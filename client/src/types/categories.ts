export interface preSavedCategory {
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}

export type Categories = Category[];

interface AddCategorySuccessAction {
  type: "ADD_CATEGORY_SUCCESS";
  payload: Categories;
}

interface AddCategoryFailureAction {
  type: "ADD_CATEGORY_FAILURE";
}

interface RemoveCategorySuccessAction {
  type: "REMOVE_CATEGORY_SUCCESS";
  payload: Categories;
}

interface RemoveCategoryFailureAction {
  type: "REMOVE_CATEGORY_FAILURE";
}

interface GetCategoriesSuccessAction {
  type: "GET_CATEGORIES_SUCCESS";
  payload: Categories;
}

interface GetCategoriesFailureAction {
  type: "GET_CATEGORIES_FAILURE";
}

export type CategoriesActionTypes =
  | AddCategorySuccessAction
  | AddCategoryFailureAction
  | RemoveCategorySuccessAction
  | RemoveCategoryFailureAction
  | GetCategoriesSuccessAction
  | GetCategoriesFailureAction;
