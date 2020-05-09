import { State } from "../types/state";
import { Logo } from "../types/logo";

export const getLogo = (state: State): Logo => state.logo;
