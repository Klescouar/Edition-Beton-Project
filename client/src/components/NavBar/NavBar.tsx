import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getCategories } from "selectors/categories";
import { getLogo } from "selectors/logo";
import MaterialButton from "components/MaterialButton/MaterialButton";
import { ReactComponent as CloseMenuIcon } from "assets/icons/closeMenu.svg";

import "./NavBar.scss";

type Props = {
  isMobile: boolean;
  setMenuIsOpen: Function;
  setCategorySelected: Function;
  menuIsOpen: boolean;
  categorySelected: string;
};

const NavBar = ({
  isMobile,
  setMenuIsOpen,
  menuIsOpen,
  setCategorySelected,
  categorySelected,
}: Props) => {
  const location = useLocation();
  const categories = useSelector(getCategories);
  const logo = useSelector(getLogo);
  const isHomePage = location.pathname === "/";
  const handleClick = () => {
    setMenuIsOpen(false);
  };

  const handleCategories = (category: string) => {
    setMenuIsOpen(false);

    return categorySelected === category
      ? setCategorySelected("")
      : setCategorySelected(category);
  };

  return (
    <div
      className={classNames("NavBar", {
        "NavBar--withMenu": menuIsOpen,
      })}
    >
      <div className="NavBar__Content">
        {isMobile && (
          <button className="NavBar__Content__Close" onClick={handleClick}>
            <CloseMenuIcon />
          </button>
        )}
        <Link className="NavBar__Content__Logo" to="/" onClick={handleClick}>
          <img
            className="NavBar__Content__Logo__Image"
            src={`../../../../medias/${logo.url}`}
            alt=""
          />
        </Link>
        <p className="NavBar__Content__Presentation">
          Virgile Veyron Guillemaud / Dessinateur drôlatique / Peintre en
          châtiment / ACAB
        </p>
        {isHomePage && (
          <div className="NavBar__Content__Actions">
            <p className="NavBar__Content__Actions__Email">
              virgilethedream@gmail.com
            </p>
            <Link
              className="NavBar__Content__Actions__Link"
              to="/about"
              onClick={handleClick}
            >
              À propos
            </Link>
            <div className="NavBar__Content__Actions__Separator"></div>
            <div className="NavBar__Content__Actions__Categories">
              <p className="NavBar__Content__Actions__Categories__Title">
                Par catégories :
              </p>
              <div className="NavBar__Content__Actions__Categories__List">
                {categories.map((category) => (
                  <MaterialButton
                    key={category._id}
                    text={category.name}
                    isActive={category.name === categorySelected}
                    handleClick={() => handleCategories(category.name)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
