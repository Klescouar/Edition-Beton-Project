import { ThunkAction } from "redux-thunk";

import { State } from "../types/state";
import { User, AuthenticationActionTypes } from "../types/authentication";
import API from "../utils/api";

export const login = (
  data: User
): ThunkAction<void, State, unknown, AuthenticationActionTypes> => async (
  dispatch
) => {
  try {
    const response = await API.post("/user/login", data);
    dispatch({
      type: "AUTHENTICATION_SUCCESS",
      payload: response.token,
    });
  } catch (error) {
    dispatch({ type: "AUTHENTICATION_FAILURE", payload: error.message });
  }
};

export const autoLogin = (): ThunkAction<
  void,
  State,
  unknown,
  AuthenticationActionTypes
> => async (dispatch) => {
  dispatch({
    type: "AUTO_AUTHENTICATION_REQUEST",
  });
  try {
    const response = await API.get("/user/me", {});
    dispatch({
      type: "AUTO_AUTHENTICATION_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "AUTO_AUTHENTICATION_FAILURE" });
  }
};
