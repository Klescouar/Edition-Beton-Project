import React, { useState, useEffect } from "react";
import { Link, useStaticQuery } from "gatsby";
import classNames from "classnames";
import Headroom from "react-headroom";
import useScreenSize from "../useScreenSize";
import NavBar from "../NavBar/NavBar";
import MenuIcon from "../../icons/menu.inline.svg";

import "./Layout.scss";
import { useLogo } from "../useLogo";
import SEO from "../seo";

export const Layout = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const screenSize = useScreenSize();
  const isMobile = screenSize === "small";

  const handleMenu = () => {
    setMenuIsOpen(true);
  };

  const logo = useLogo();

  return (
    <div
      className={classNames("Layout", {
        "Layout--withMenu": menuIsOpen,
      })}
    >
      <SEO />
      <NavBar
        isMobile={isMobile}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        setCategorySelected={setCategorySelected}
        categorySelected={categorySelected}
      />
      <div
        className={classNames("Layout__Content", {
          "Layout__Content--withMenu": menuIsOpen,
        })}
      >
        {!menuIsOpen && isMobile && (
          <Headroom>
            <div className="Layout__Nav">
              <Link to="/">
                <img
                  className="Layout__Nav__Logo"
                  src={`http://localhost:4444/medias/${logo.url}`}
                  alt=""
                />
              </Link>
              <button className="Layout__Nav__Button" onClick={handleMenu}>
                <MenuIcon />
              </button>
            </div>
          </Headroom>
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
