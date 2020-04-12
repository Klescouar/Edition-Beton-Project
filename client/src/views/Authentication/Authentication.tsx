import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "actions/authentication";
import { getAuthenticationError } from "selectors/authentication";
import "./Authentication.scss";

export const Authentication = () => {
  const dispatch = useDispatch();
  const authenticationError = useSelector(getAuthenticationError);
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClick = () => {
    dispatch(login(values));
  };

  return (
    <div className="Authentication">
      <div className="Authentication__Form">
        <div className="Authentication__Form__Box">
          <input
            onChange={handleChange}
            name="username"
            value={values.username}
            className="Authentication__Form__Box__Input"
            placeholder=" "
            type="text"
          />
          <span className="Authentication__Form__Box__Highlight"></span>
          <span className="Authentication__Form__Box__Bar"></span>
          <label>Identifiant</label>
        </div>
        <div className="Authentication__Form__Box">
          <input
            onChange={handleChange}
            name="password"
            value={values.password}
            className="Authentication__Form__Box__Input"
            placeholder=" "
            type="password"
          />
          <span className="Authentication__Form__Box__Highlight"></span>
          <span className="Authentication__Form__Box__Bar"></span>
          <label>Mot de passe</label>
        </div>
        {authenticationError && (
          <p className="Authentication__Form__Error">{authenticationError}</p>
        )}
        <button onClick={handleClick} className="Authentication__Form__Submit">
          Se Connecter
        </button>
      </div>
    </div>
  );
};

export default Authentication;
