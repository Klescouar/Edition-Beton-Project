import React, { useState, useEffect } from "react";
import Headroom from "react-headroom";
import { Router } from "@reach/router";

import HandleArticles from "./HandleArticles/HandleArticles";
import HandleArticle from "./HandleArticle/HandleArticle";
import HandleCategories from "./HandleCategories/HandleCategories";
import HandleAbout from "./HandleAbout/HandleAbout";
import HandleLogo from "./HandleLogo/HandleLogo";
import BackofficeNav from "./BackofficeNav/BackofficeNav";
import useScreenSize from "../../utils/useScreenSize";

// @ts-ignore
import MenuIcon from "../../icons/white-menu.inline.svg";
// @ts-ignore
import eyeImage from "../../images/oeil.jpg";

import "../../styles/quill.snow.scss";
import "./Backoffice.scss";
import { useDispatch } from "react-redux";
import { getAbout } from "../../actions/about";
import { loadLogo } from "../../actions/logo";
import { getArticles } from "../../actions/articles";
import { getCategories } from "../../actions/categories";

export const Backoffice = () => {
  const screenSize = useScreenSize();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const isMobile = screenSize === "small";

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(autoLogin());
    // dispatch(getArticles());
    dispatch(getCategories());
    dispatch(getAbout());
    dispatch(loadLogo());
  }, [dispatch]);

  const handleMenu = () => {
    setMenuIsOpen(true);
  };

  return (
    <div className="Backoffice">
      {isMobile && (
        <Headroom>
          <div className="Backoffice__Nav">
            <img className="Backoffice__Nav__Logo" src={eyeImage} alt="" />
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
        <Router>
          <HandleArticles path="/" />
          <HandleArticle path="article" key="Add" />
          <HandleArticle path="article/:id" key="Modify" />
          <HandleCategories path="categories" />
          <HandleAbout path="about" />
          <HandleLogo path="logo" />
        </Router>
      </div>
    </div>
  );
};

export default Backoffice;
