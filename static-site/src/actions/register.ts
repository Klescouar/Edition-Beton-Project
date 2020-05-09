import { ThunkAction } from "redux-thunk";

import { State } from "../types/state";
import { RegisterActionTypes } from "../types/register";
import { User } from "../types/authentication";
import API from "../utils/api";

type Error = {
  errors?: {
    msg: string;
  }[];
  message?: string;
};

export const register = (
  data: User
): ThunkAction<void, State, unknown, RegisterActionTypes> => async (
  dispatch
) => {
  try {
    const response = await API.post("/user/signup", data);
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.token,
    });
  } catch (error) {
    let catchedError = <Error>error;
    if (catchedError.errors) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: catchedError.errors.map((err) => err.msg),
      });
    } else {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: [catchedError.message || "An unknown error occured"],
      });
    }
  }
};
