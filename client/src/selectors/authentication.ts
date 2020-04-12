import { State } from "types/state";

export const getAuthenticationError = (state: State): string =>
  state.authentication.authenticationError;

export const getAuthenticationStatus = (state: State): boolean =>
  state.authentication.isAuthenticated;

export const getAuthenticationLoadStatus = (state: State): boolean =>
  state.authentication.isLoading;
