export interface User {
  username: string;
  password: string;
}

interface AuthenticationSuccessAction {
  type: "AUTHENTICATION_SUCCESS";
  payload: {
    token: string;
  };
}

interface AuthenticationFailureAction {
  type: "AUTHENTICATION_FAILURE";
  payload: string;
}

interface AutoAuthenticationRequestAction {
  type: "AUTO_AUTHENTICATION_REQUEST";
}

interface AutoAuthenticationSuccessAction {
  type: "AUTO_AUTHENTICATION_SUCCESS";
  payload: string;
}

interface AutoAuthenticationFailureAction {
  type: "AUTO_AUTHENTICATION_FAILURE";
}

export type AuthenticationActionTypes =
  | AuthenticationSuccessAction
  | AuthenticationFailureAction
  | AutoAuthenticationSuccessAction
  | AutoAuthenticationFailureAction
  | AutoAuthenticationRequestAction;
