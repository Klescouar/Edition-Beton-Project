import { RegisterActionTypes } from "types/register";

type RegisterState = {
  token: string;
  registerError: string;
};

const initialState = {
  token: "",
  registerError: "",
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
        registerError: action.payload,
      };
    default:
      return state;
  }
};
