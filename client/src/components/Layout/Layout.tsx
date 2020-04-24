import React, { useState } from "react";
// @ts-ignore
import { Route, Routes } from "react-router-dom";
import classNames from "classnames";
import Headroom from "react-headroom";
import useScreenSize from "utils/useScreenSize";
import NavBar from "components/NavBar/NavBar";
import Home from "views/Home/Home";
import About from "views/About/About";
import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";

import "./Layout.scss";

export const Layout = () => {
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
      />
      <div
        className={classNames("Layout__Content", {
          "Layout__Content--withMenu": menuIsOpen,
        })}
      >
        {!menuIsOpen && isMobile && (
          <Headroom>
            <div className="Layout__Nav">
              <img
                className="Layout__Nav__Logo"
                src={require("../../assets/images/beton.png")}
                alt=""
              />
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
