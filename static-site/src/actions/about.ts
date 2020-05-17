import { ThunkAction } from "redux-thunk";

import { AboutActionTypes, About } from "../types/about";
import { State } from "../types/state";
import API from "../utils/api";

export const getAbout = (): ThunkAction<
  void,
  State,
  unknown,
  AboutActionTypes
> => async (dispatch) => {
  try {
    const response = await API.get("/about");
    dispatch({
      type: "GET_ABOUT_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "GET_ABOUT_FAILURE" });
  }
};

export const updateAbout = (
  about: About
): ThunkAction<void, State, unknown, AboutActionTypes> => async (dispatch) => {
  try {
    const response = await API.post("/about", about);
    dispatch({
      type: "UPDATE_ABOUT_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "UPDATE_ABOUT_FAILURE" });
  }
};
