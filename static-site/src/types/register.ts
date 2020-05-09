export interface RegisterData {
  token: string;
}

interface RegisterSuccessAction {
  type: string;
  payload: string;
}

interface RegisterFailureAction {
  type: string;
  payload: string[];
}

export type RegisterActionTypes = RegisterSuccessAction | RegisterFailureAction;
