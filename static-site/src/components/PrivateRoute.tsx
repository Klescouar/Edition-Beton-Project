import React from "react";
import { navigate } from "gatsby";
import { RouteComponentProps, useLocation } from "@reach/router";
import { useSelector } from "react-redux";

import {
  getAuthenticationStatus,
  getAuthenticationLoadStatus,
} from "../selectors/authentication";

type Props = {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
} & RouteComponentProps;

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const location = useLocation();
  const isLoggedIn = useSelector(getAuthenticationStatus);
  const isLogging = useSelector(getAuthenticationLoadStatus);

  if (isLogging) {
    return null;
  }

  if (!isLoggedIn && location.pathname !== `/admin/login`) {
    navigate("/admin/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
