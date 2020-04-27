import React, { useEffect } from "react";
// @ts-ignore
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "utils/ProtectedRoute";
import Layout from "components/Layout/Layout";
import Authentication from "views/Authentication/Authentication";
import Register from "views/Register/Register";
import Backoffice from "views/Backoffice/Backoffice";
import About from "views/About/About";
import { autoLogin } from "actions/authentication";
import { getArticles } from "actions/articles";
import { getCategories } from "actions/categories";
import { loadLogo } from "actions/logo";
import { getAbout } from "actions/about";
import { getLogo } from "selectors/logo";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const logo = useSelector(getLogo);
  const favicon = document.getElementById("favicon");
  // @ts-ignore
  if (favicon) favicon.href = `../../medias/${logo.url}`;

  useEffect(() => {
    const token = Cookies.get("token");
    dispatch(autoLogin(token));
    dispatch(getArticles());
    dispatch(getCategories());
    dispatch(getAbout());
    dispatch(loadLogo());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="about" element={<About />} />
          </Route>
          <Route path="login" element={<Authentication />} />
          <Route path="register" element={<Register />} />
          <ProtectedRoute path="backoffice/*" Component={Backoffice} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
