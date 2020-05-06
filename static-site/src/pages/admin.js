import React from "react";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

import combineReducers from "../reducers/index";
import Backoffice from "../components/Backoffice/Backoffice";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <Backoffice path="/admin/dashboard/*" />
      </Router>
    </Provider>
  );
};
