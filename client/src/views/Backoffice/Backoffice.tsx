import React, { useState } from "react";
// @ts-ignore
import { Route, Routes } from "react-router-dom";
import Headroom from "react-headroom";
import Articles from "views/Backoffice/Articles/Articles";
import AddArticle from "views/Backoffice/AddArticle/AddArticle";
import BackofficeNav from "components/BackofficeNav/BackofficeNav";
import HandleCategories from "views/Backoffice/HandleCategories/HandleCategories";
import useScreenSize from "utils/useScreenSize";
import { ReactComponent as MenuIcon } from "assets/icons/white-menu.svg";

import "./Backoffice.scss";

export const Backoffice = () => {
  const screenSize = useScreenSize();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const isMobile = screenSize === "small";

  const handleMenu = () => {
    setMenuIsOpen(true);
  };

  return (
    <div className="Backoffice">
      {isMobile && (
        <Headroom>
          <div className="Backoffice__Nav">
            <img
              className="Backoffice__Nav__Logo"
              src={require("../../assets/images/oeil.jpg")}
              alt=""
            />
            <button className="Backoffice__Nav__Button" onClick={handleMenu}>
              <MenuIcon />
            </button>
          </div>
        </Headroom>
      )}
      {(!isMobile || menuIsOpen) && (
        <BackofficeNav setMenuIsOpen={setMenuIsOpen} isMobile={isMobile} />
      )}
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
