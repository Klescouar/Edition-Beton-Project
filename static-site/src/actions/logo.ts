import { ThunkAction } from "redux-thunk";

import { LogoActionTypes, PreSavedLogo } from "../types/logo";
import { State } from "../types/state";
import API from "../utils/api";

export const loadLogo = (): ThunkAction<
  void,
  State,
  unknown,
  LogoActionTypes
> => async (dispatch) => {
  try {
    const response = await API.get("/logo");
    dispatch({
      type: "GET_LOGO_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "GET_LOGO_FAILURE" });
  }
};

export const updateLogo = (
  logo: PreSavedLogo
): ThunkAction<void, State, unknown, LogoActionTypes> => async (dispatch) => {
  try {
    const response = await API.post("/logo", logo);
    dispatch({
      type: "UPDATE_LOGO_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "UPDATE_LOGO_FAILURE" });
  }
};
