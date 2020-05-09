import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, RouteComponentProps } from "@reach/router";

import { login } from "../../actions/authentication";
import MaterialInput from "../MaterialInput/MaterialInput";
import {
  getAuthenticationError,
  getAuthenticationStatus,
} from "../../selectors/authentication";

import "./Authentication.scss";

export const Authentication = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticationError = useSelector(getAuthenticationError);
  const isAuthenticated = useSelector(getAuthenticationStatus);
  const [values, setValues] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(values));
  };

  return (
    <div className="Authentication">
      <form className="Authentication__Form" onSubmit={handleSubmit}>
        <MaterialInput
          name="username"
          handleChange={handleChange}
          value={values.username}
          label="Identifiant"
        />
        <MaterialInput
          name="password"
          handleChange={handleChange}
          value={values.password}
          type="password"
          label="Mot de passe"
        />
        {authenticationError && (
          <p className="Authentication__Form__Error">{authenticationError}</p>
        )}
        <button className="Authentication__Form__Submit">Se Connecter</button>
      </form>
    </div>
  );
};

export default Authentication;
