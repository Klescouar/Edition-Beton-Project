import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../types/state";
import { ThunkAction } from "redux-thunk";

import { AboutActionTypes } from "../types/about";
import { ArticleActionTypes } from "../types/articles";
import { LogoActionTypes } from "../types/logo";
import { CategoriesActionTypes } from "../types/categories";

type FetchAction =
  | AboutActionTypes
  | ArticleActionTypes
  | LogoActionTypes
  | CategoriesActionTypes;

export function useFetchData<T>(
  fetcher: () => ThunkAction<void, State, unknown, FetchAction>,
  getter: (state: State) => T
) {
  const data = useSelector(getter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetcher());
  }, [dispatch]);

  return data;
}
