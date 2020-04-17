import React from "react";
import { NavLink } from "react-router-dom";

import "./BackofficeNav.scss";

export const BackofficeNav = () => {
  return (
    <div className="BackofficeNav">
      <div className="BackofficeNav__Head">
        <img
          className="BackofficeNav__Head__Image"
          src={require("../../assets/images/oeil.jpg")}
          alt=""
        />
      </div>
      <NavLink
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/backoffice"
      >
        Liste des articles
      </NavLink>
      <NavLink
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/backoffice/article"
      >
        Ajouter un article
      </NavLink>
      <NavLink
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/backoffice/categories"
      >
        Categories
      </NavLink>
    </div>
  );
};

export default BackofficeNav;
