import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import "./Menu.scss";

type Props = {
  isMinified: boolean;
};

const Menu = ({ isMinified }: Props) => {
  return (
    <div
      className={classNames("Menu", {
        "Menu--minified": isMinified,
      })}
    >
      <img
        className={classNames("Menu__Logo", {
          "Menu__Logo--minified": isMinified,
        })}
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
