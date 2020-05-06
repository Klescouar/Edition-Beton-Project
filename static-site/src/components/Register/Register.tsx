import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/register";
import { getRegisterError } from "../../selectors/register";
import MaterialInput from "../MaterialInput/MaterialInput";

import "./Register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const registerError = useSelector(getRegisterError);
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClick = () => dispatch(register(values));

  return (
    <div className="Register">
      <div className="Register__Form">
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
        {registerError && (
          <p className="Authentication__Form__Error">{registerError}</p>
        )}
        <button onClick={handleClick} className="Register__Form__Submit">
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default Register;
