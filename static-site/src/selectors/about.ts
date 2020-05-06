import { State } from "../types/state";
import { About } from "../types/about";

export const getAbout = (state: State): About => state.about;
