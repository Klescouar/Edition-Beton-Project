import React from "react";
import { Link } from "react-router-dom";

import "./HomeNav.scss";

const HomeNav = () => {
  return (
    <div className="HomeNav">
      <img
        className={"HomeNav__Logo"}
        src={require("../../assets/images/beton.png")}
        alt=""
      />
      <Link className="HomeNav__Link" to="/about">
        À propos
      </Link>
    </div>
  );
};

export default HomeNav;
