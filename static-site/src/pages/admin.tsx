import React, { useEffect } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { Provider, useDispatch } from "react-redux";
import { navigate } from "gatsby";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

import combineReducers from "../reducers/index";
import Backoffice from "../components/Backoffice/Backoffice";
import Authentication from "../components/Authentication/Authentication";
import Register from "../components/Register/Register";
import PrivateRoute from "../components/PrivateRoute";
import { autoLogin } from "../actions/authentication";
import SEO from "../components/seo";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const RedirectToDashboard = (props: RouteComponentProps) => {
  if (typeof window !== "undefined") {
    navigate("/admin/dashboard");
  }

  return null;
};

const AutoLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return null;
};

export default () => {
  return (
    <Provider store={store}>
      <SEO title="Admin" />
      <AutoLogin />
      <Router basepath="/admin">
        <PrivateRoute component={Backoffice} path="/dashboard/*" />
        <Authentication path="/login" />
        <Register path="/register" />
        <RedirectToDashboard path="/" />
      </Router>
    </Provider>
  );
};
