import React, { useEffect, FunctionComponent, useRef } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import { useNavigate, Route } from "react-router-dom";
import {
  getAuthenticationStatus,
  getAuthenticationLoadStatus,
} from "selectors/authentication";

type Props = {
  Component: FunctionComponent;
  path: string;
};

const ProtectedRoute = ({ Component, path }: Props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getAuthenticationStatus);
  const isLoading = useSelector(getAuthenticationLoadStatus);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!isLoading && !isAuthenticated) navigate("/login");
  });

  return <Route path={path} element={<Component />} />;
};

export default ProtectedRoute;
