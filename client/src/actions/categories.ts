import { CategoriesActionTypes } from "types/categories";
import { State } from "types/state";
import { ThunkAction } from "redux-thunk";
import API from "utils/api";

export const addCategory = (
  categoryName: string
): ThunkAction<void, State, unknown, CategoriesActionTypes> => async (
  dispatch
) => {
  try {
    const response = await API.post("/category", { name: categoryName });
    dispatch({
      type: "ADD_CATEGORY_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "ADD_CATEGORY_FAILURE" });
  }
};

export const removeCategory = (
  id: string
): ThunkAction<void, State, unknown, CategoriesActionTypes> => async (
  dispatch
) => {
  try {
    const response = await API.delete("/category", { id });
    dispatch({
      type: "REMOVE_CATEGORY_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "REMOVE_CATEGORY_FAILURE" });
  }
};

export const getCategories = (): ThunkAction<
  void,
  State,
  unknown,
  CategoriesActionTypes
> => async (dispatch) => {
  try {
    const response = await API.get("/categories");
    dispatch({
      type: "GET_CATEGORIES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "GET_CATEGORIES_FAILURE", payload: error.message });
  }
};
