import React, { useState } from "react";
import Headroom from "react-headroom";
import { Router, RouteComponentProps } from "@reach/router";
import { Link } from "gatsby";

import HandleArticles from "./HandleArticles/HandleArticles";
import HandleArticle from "./HandleArticle/HandleArticle";
import HandleCategories from "./HandleCategories/HandleCategories";
import HandleAbout from "./HandleAbout/HandleAbout";
import HandleLogo from "./HandleLogo/HandleLogo";
import BackofficeNav from "./BackofficeNav/BackofficeNav";
import useScreenSize from "../useScreenSize";

import MenuIcon from "../../icons/white-menu.inline.svg";
import eyeImage from "../../images/oeil.jpg";

import "../../styles/quill.snow.scss";
import "./Backoffice.scss";

export const Backoffice = (props: RouteComponentProps) => {
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
            <Link to="/" className="BackofficeNav__Head">
              <img className="Backoffice__Nav__Logo" src={eyeImage} alt="" />
            </Link>
            <button className="Backoffice__Nav__Button" onClick={handleMenu}>
              <MenuIcon />
            </button>
          </div>
        </Headroom>
      )}
      {(!isMobile || menuIsOpen) && (
        <BackofficeNav setMenuIsOpen={setMenuIsOpen} isMobile={isMobile} />
      )}
      <Router primary={false} className="Backoffice__Content">
        <HandleArticles path="/" />
        <HandleArticle path="article" key="Add" />
        <HandleArticle path="article/:id" key="Modify" />
        <HandleCategories path="categories" />
        <HandleAbout path="about" />
        <HandleLogo path="logo" />
      </Router>
    </div>
  );
};

export default Backoffice;
