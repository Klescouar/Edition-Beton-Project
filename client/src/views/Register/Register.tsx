import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "actions/register";
import { getRegisterError } from "selectors/register";
import "./Register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const registerError = useSelector(getRegisterError);
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClick = () => {
    dispatch(register(values));
  };

  return (
    <div className="Register">
      <div className="Register__Form">
        <div className="Register__Form__Box">
          <input
            onChange={handleChange}
            name="username"
            value={values.username}
            className="Register__Form__Box__Input"
            placeholder=" "
            type="text"
          />
          <span className="Register__Form__Box__Highlight"></span>
          <span className="Register__Form__Box__Bar"></span>
          <label>Identifiant</label>
        </div>
        <div className="Register__Form__Box">
          <input
            onChange={handleChange}
            name="password"
            value={values.password}
            className="Register__Form__Box__Input"
            placeholder=" "
            type="password"
          />
          <span className="Register__Form__Box__Highlight"></span>
          <span className="Register__Form__Box__Bar"></span>
          <label>Mot de passe</label>
        </div>
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
