import React, { useState } from "react";
import { Link } from "gatsby";
import classNames from "classnames";
import Headroom from "react-headroom";
import useScreenSize from "../useScreenSize";
import NavBar from "../NavBar/NavBar";
// import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";

import "./Layout.scss";

export const Layout = ({ children }) => {
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
              <Link to="/">
                <img
                  className="Layout__Nav__Logo"
                  src={`http://localhost:4444/medias/${logo.url}`}
                  alt=""
                />
              </Link>
              <button className="Layout__Nav__Button" onClick={handleMenu}>
                Menu
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
