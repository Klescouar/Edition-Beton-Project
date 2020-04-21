import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as CloseIcon } from "assets/icons/white-cross-out.svg";

import "./BackofficeNav.scss";

type Props = {
  isMobile: boolean;
  setMenuIsOpen: Function;
};

export const BackofficeNav = ({ isMobile, setMenuIsOpen }: Props) => {
  const handleClick = () => {
    setMenuIsOpen(false);
  };
  return (
    <div className="BackofficeNav">
      {isMobile && (
        <button className="BackofficeNav__Close" onClick={handleClick}>
          <CloseIcon />
        </button>
      )}
      <NavLink onClick={handleClick} to="/" className="BackofficeNav__Head">
        <img
          className="BackofficeNav__Head__Image"
          src={require("../../assets/images/oeil.jpg")}
          alt=""
        />
      </NavLink>
      <NavLink
        onClick={handleClick}
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/backoffice"
      >
        Liste des articles
      </NavLink>
      <NavLink
        onClick={handleClick}
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/backoffice/article"
      >
        Ajouter un article
      </NavLink>
      <NavLink
        onClick={handleClick}
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/backoffice/categories"
      >
        Categories
      </NavLink>
      <NavLink
        onClick={handleClick}
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/backoffice/about"
      >
        À propos
      </NavLink>
    </div>
  );
};

export default BackofficeNav;
