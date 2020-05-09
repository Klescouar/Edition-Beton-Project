export interface preSavedCategory {
  name: string;
}

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
export interface Category {
  _id: string;
  id: string;
  name: string;
  fields: {
    slug: string;
  };
}

export type Categories = Category[];

export type CategoriesData = {
  allCategoryType: {
    edges: [
      {
        node: Category;
      }
    ];
  };
};
