import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.scss";

export const Nav = () => {
  return (
    <div className="Nav">
      <div className="Nav__Head">
        <img
          className="Nav__Head__Image"
          src={require("../../assets/images/oeil.jpg")}
          alt=""
        />
      </div>
      <NavLink
        activeClassName="Nav__Link--active"
        className="Nav__Link"
        to="/backoffice/article"
      >
        Ajouter un article
      </NavLink>
      <NavLink
        activeClassName="Nav__Link--active"
        className="Nav__Link"
        to="/backoffice"
      >
        Liste des articles
      </NavLink>
    </div>
  );
};

export default Nav;
