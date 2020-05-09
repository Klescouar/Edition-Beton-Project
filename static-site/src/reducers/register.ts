import { RegisterActionTypes } from "../types/register";

type RegisterState = {
  token: string;
  registerErrors: string[];
};

const initialState = {
  token: "",
  registerErrors: [],
};

export default (
  state: RegisterState = initialState,
  action: RegisterActionTypes
) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        token: action.payload,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        registerErrors: action.payload,
      };
    default:
      return state;
  }
};
