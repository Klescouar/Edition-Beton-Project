import React, { useState } from "react";
import "./Login.scss";

export const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="Login">
      <form className="Login__Form">
        <div className="Login__Form__Box">
          <input
            onChange={handleChange}
            name="email"
            value={values.email}
            className="Login__Form__Box__Input"
            placeholder=" "
            type="text"
          />
          <span className="Login__Form__Box__Highlight"></span>
          <span className="Login__Form__Box__Bar"></span>
          <label>Email</label>
        </div>
        <div className="Login__Form__Box">
          <input
            onChange={handleChange}
            name="password"
            value={values.password}
            className="Login__Form__Box__Input"
            placeholder=" "
            type="password"
          />
          <span className="Login__Form__Box__Highlight"></span>
          <span className="Login__Form__Box__Bar"></span>
          <label>Mot de passe</label>
        </div>
        <button className="Login__Form__Submit">Se Connecter</button>
      </form>
    </div>
  );
};

export default Login;
