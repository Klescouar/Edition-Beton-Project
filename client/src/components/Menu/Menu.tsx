import React from "react";
import { Link } from "react-router-dom";

import "./Menu.scss";

const Menu = () => {
  return (
    <div className="Menu">
      <img
        className="Menu__Logo"
        src={require("../../assets/images/beton.png")}
        alt=""
      />
      <Link className="Menu__Link" to="/about">
        À propos
      </Link>
    </div>
  );
};

export default Menu;
