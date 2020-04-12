import React from "react";
// @ts-ignore
import { Route, Routes } from "react-router-dom";
import Articles from "views/Backoffice/Articles/Articles";
import Article from "views/Backoffice/Article/Article";
import Nav from "views/Backoffice/Nav";

import "./Backoffice.scss";

export const Backoffice = () => {
  return (
    <div className="Backoffice">
      <Nav />
      <div className="Backoffice__Content">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="article" element={<Article />} />
        </Routes>
      </div>
    </div>
  );
};

export default Backoffice;
