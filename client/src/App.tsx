import React, { useEffect } from "react";
// @ts-ignore
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import ProtectedRoute from "utils/ProtectedRoute";
import Home from "views/Home/Home";
import Authentication from "views/Authentication/Authentication";
import Register from "views/Register/Register";
import Backoffice from "views/Backoffice/Backoffice";
import { autoLogin } from "actions/authentication";
import { getArticles } from "actions/articles";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    dispatch(autoLogin(token));
    dispatch(getArticles());
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Authentication />} />
          <Route path="register" element={<Register />} />
          <ProtectedRoute path="backoffice/*" Component={Backoffice} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
