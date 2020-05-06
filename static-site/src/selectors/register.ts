import { State } from "../types/state";

export const getRegisterError = (state: State): string =>
  state.register.registerError;
