import React, { useState } from "react";
// @ts-ignore
import { Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Headroom from "react-headroom";
import useScreenSize from "utils/useScreenSize";
import NavBar from "components/NavBar/NavBar";
import Home from "views/Home/Home";
import About from "views/About/About";
import { getLogo } from "selectors/logo";
import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";

import "./Layout.scss";

export const Layout = () => {
  const logo = useSelector(getLogo);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const screenSize = useScreenSize();
  const isMobile = screenSize === "small";

  const handleMenu = () => {
    setMenuIsOpen(true);
  };

  return (
    <div
      className={classNames("Layout", {
        "Layout--withMenu": menuIsOpen,
      })}
    >
      <NavBar
        isMobile={isMobile}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        setCategorySelected={setCategorySelected}
        categorySelected={categorySelected}
        logo={logo}
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
                  src={`../../../../medias/${logo.url}`}
                  alt=""
                />
              </Link>
              <button className="Layout__Nav__Button" onClick={handleMenu}>
                <MenuIcon />
              </button>
            </div>
          </Headroom>
        )}
        <Routes>
          <Route
            path="/"
            element={<Home categorySelected={categorySelected} />}
          />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
