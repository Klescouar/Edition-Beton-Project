import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getCategories } from "selectors/categories";
import MaterialButton from "components/MaterialButton/MaterialButton";
import { ReactComponent as CloseMenuIcon } from "assets/icons/closeMenu.svg";

import "./HomeNav.scss";

type Props = {
  isMobile: boolean;
  setMenuIsOpen: Function;
  setCategorySelected: Function;
  menuIsOpen: boolean;
  categorySelected: string;
};

const HomeNav = ({
  isMobile,
  setMenuIsOpen,
  menuIsOpen,
  setCategorySelected,
  categorySelected,
}: Props) => {
  const categories = useSelector(getCategories);
  const handleClick = () => {
    setMenuIsOpen(false);
  };

  const handleCategories = (category: string) => {
    return categorySelected === category
      ? setCategorySelected("")
      : setCategorySelected(category);
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
        <p className="HomeNav__Content__Presentation">
          Virgile Veyron Guillemaud / Dessinateur drôlatique / Peintre en
          châtiment / ACAB
        </p>
        <p className="HomeNav__Content__Email">virgilethedream@gmail.com</p>
        {/* <Link className="HomeNav__Content__Link" to="/about">
          À propos
        </Link> */}
        <div className="HomeNav__Content__Separator"></div>
        <div className="HomeNav__Content__Categories">
          <p className="HomeNav__Content__Categories__Title">
            Par catégories :
          </p>
          <div className="HomeNav__Content__Categories__List">
            {categories.map((category) => (
              <MaterialButton
                text={category.name}
                isActive={category.name === categorySelected}
                handleClick={() => handleCategories(category.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
