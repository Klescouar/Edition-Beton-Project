import React from "react";
import { Link } from "gatsby";

// @ts-ignore
import CloseIcon from "../../../icons/white-cross-out.svg";
// @ts-ignore
import eyeImage from "../../../images/oeil.jpg";

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
      <Link onClick={handleClick} to="/" className="BackofficeNav__Head">
        <img className="BackofficeNav__Head__Image" src={eyeImage} alt="" />
      </Link>
      <Link
        onClick={handleClick}
        // @ts-ignore
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/admin/dashboard"
      >
        Liste des articles
      </Link>
      <Link
        onClick={handleClick}
        // @ts-ignore
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/admin/dashboard/article"
      >
        Ajouter un article
      </Link>
      <Link
        onClick={handleClick}
        // @ts-ignore
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/admin/dashboard/categories"
      >
        Modifier les catégories
      </Link>
      <Link
        onClick={handleClick}
        // @ts-ignore
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/admin/dashboard/about"
      >
        Modifier la page "À propos"
      </Link>
      <Link
        onClick={handleClick}
        // @ts-ignore
        activeClassName="BackofficeNav__Link--active"
        className="BackofficeNav__Link"
        to="/admin/dashboard/logo"
      >
        Changer de logo
      </Link>
    </div>
  );
};

export default BackofficeNav;
