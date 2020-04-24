export interface PreSavedLogo {
  url: string;
}

export interface Logo {
  _id: string;
  url: string;
}

interface UpdateLogoSuccessAction {
  type: "UPDATE_LOGO_SUCCESS";
  payload: Logo;
}

interface UpdateLogoFailureAction {
  type: "UPDATE_LOGO_FAILURE";
}

interface GetLogoSuccessAction {
  type: "GET_LOGO_SUCCESS";
  payload: Logo;
}

interface GetLogoFailureAction {
  type: "GET_LOGO_FAILURE";
}

export type LogoActionTypes =
  | UpdateLogoSuccessAction
  | UpdateLogoFailureAction
  | GetLogoSuccessAction
  | GetLogoFailureAction;
