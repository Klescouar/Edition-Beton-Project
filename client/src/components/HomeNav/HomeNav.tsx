import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { ReactComponent as CloseMenuIcon } from "assets/icons/closeMenu.svg";

import "./HomeNav.scss";

type Props = {
  isMobile: boolean;
  setMenuIsOpen: Function;
  menuIsOpen: boolean;
};

const HomeNav = ({ isMobile, setMenuIsOpen, menuIsOpen }: Props) => {
  const handleClick = () => {
    setMenuIsOpen(false);
  };

  return (
    <div
      className={classNames("HomeNav", {
        "HomeNav--withMenu": menuIsOpen,
      })}
    >
      <div className="HomeNav__Content">
        {isMobile && (
          <button className="HomeNav__Content__Close" onClick={handleClick}>
            <CloseMenuIcon />
          </button>
        )}
        <img
          className={"HomeNav__Content__Logo"}
          src={require("../../assets/images/beton.png")}
          alt=""
        />
        <Link className="HomeNav__Content__Link" to="/about">
          À propos
        </Link>
      </div>
    </div>
  );
};

export default HomeNav;
