import React, { useState } from "react";
import { Link } from "gatsby";
import classNames from "classnames";
import Headroom from "react-headroom";
import Img from "gatsby-image";

import useScreenSize from "../useScreenSize";
import NavBar from "../NavBar/NavBar";
import { useLogo } from "../useLogo";
import SEO from "../seo";
import MenuIcon from "../../icons/menu.inline.svg";

import "./Layout.scss";

type Props = {
  children: React.ReactNode;
  isHome?: boolean;
};

export const Layout = ({ children, isHome = false }: Props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
        isHome={isHome}
        isMobile={isMobile}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
      />
      <main
        className={classNames("Layout__Content", {
          "Layout__Content--withMenu": menuIsOpen,
        })}
      >
        {!menuIsOpen && isMobile && (
          <Headroom>
            <div className="Layout__Nav">
              {logo.image?.childImageSharp?.fluid && (
                <Link to="/" title="Page d'accueil">
                  <Img
                    className="Layout__Nav__Logo"
                    fluid={logo.image.childImageSharp.fluid}
                    alt=""
                  />
                </Link>
              )}
              <button className="Layout__Nav__Button" onClick={handleMenu}>
                <MenuIcon />
              </button>
            </div>
          </Headroom>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;
