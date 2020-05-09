import React, { useEffect } from "react";
import { Router, Redirect, RouteComponentProps } from "@reach/router";
import { Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

import combineReducers from "../reducers/index";
import Backoffice from "../components/Backoffice/Backoffice";
import Authentication from "../components/Authentication/Authentication";
import Register from "../components/Register/Register";
import PrivateRoute from "../components/PrivateRoute";
import { navigate } from "gatsby";
import { autoLogin } from "../actions/authentication";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const RedirectToDashboard = (props: RouteComponentProps) => {
  navigate("/admin/dashboard");
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
      <AutoLogin />
      <Router>
        <PrivateRoute component={Backoffice} path="/admin/dashboard/*" />
        <Authentication path="/admin/login" />
        <Register path="/admin/register" />
        <RedirectToDashboard path="/admin" />
      </Router>
    </Provider>
  );
};
