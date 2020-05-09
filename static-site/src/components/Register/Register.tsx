import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";

import { register } from "../../actions/register";
import { getRegisterError } from "../../selectors/register";
import MaterialInput from "../MaterialInput/MaterialInput";

import "./Register.scss";
import { navigate } from "gatsby";

export const Register = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const registerErrors = useSelector(getRegisterError);
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(values));
  };

  return (
    <div className="Register">
      <form className="Register__Form" onSubmit={handleSubmit}>
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
        {registerErrors &&
          registerErrors.map((error) => (
            <p key={error} className="Authentication__Form__Error">
              {error}
            </p>
          ))}
        <button className="Register__Form__Submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
