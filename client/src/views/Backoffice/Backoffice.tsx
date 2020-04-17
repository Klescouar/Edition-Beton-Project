import React from "react";
// @ts-ignore
import { Route, Routes } from "react-router-dom";
import Articles from "views/Backoffice/Articles/Articles";
import AddArticle from "views/Backoffice/AddArticle/AddArticle";
import BackofficeNav from "components/BackofficeNav/BackofficeNav";
import HandleCategories from "./HandleCategories/HandleCategories";

import "./Backoffice.scss";

export const Backoffice = () => {
  return (
    <div className="Backoffice">
      <BackofficeNav />
      <div className="Backoffice__Content">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="article" element={<AddArticle />} />
          <Route path="article/:id" element={<AddArticle />} />
          <Route path="categories" element={<HandleCategories />} />
        </Routes>
      </div>
    </div>
  );
};

export default Backoffice;
