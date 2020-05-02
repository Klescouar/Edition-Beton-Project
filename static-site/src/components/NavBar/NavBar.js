import React from "react";
import classNames from "classnames";
import { Link, useStaticQuery, graphql } from "gatsby";
import MaterialButton from "../MaterialButton/MaterialButton";
import { useLogo } from "../useLogo";

import CloseIcon from "../../icons/closeMenu.inline.svg";

import "./NavBar.scss";

const NavBar = ({
  isMobile,
  setMenuIsOpen,
  menuIsOpen,
  setCategorySelected,
  categorySelected,
}) => {
  const handleClick = () => {
    setMenuIsOpen(false);
  };

  const handleCategories = (category) => {
    setMenuIsOpen(false);

    return categorySelected === category
      ? setCategorySelected("")
      : setCategorySelected(category);
  };

  const logo = useLogo();
  const categories = useStaticQuery(graphql`
    query Categories {
      allCategoryType {
        edges {
          node {
            name
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <div
      className={classNames("NavBar", {
        "NavBar--withMenu": menuIsOpen,
      })}
    >
      <div className="NavBar__Content">
        {isMobile && (
          <button className="NavBar__Content__Close" onClick={handleClick}>
            <CloseIcon />
          </button>
        )}
        <Link className="NavBar__Content__Logo" to="/" onClick={handleClick}>
          <img
            className="NavBar__Content__Logo__Image"
            src={`http://localhost:4444/medias/${logo.url}`}
            alt=""
          />
        </Link>
        <p className="NavBar__Content__Presentation">
          Virgile Veyron Guillemaud / Dessinateur drôlatique / Peintre en
          châtiment / ACAB
        </p>
        {true && (
          <div className="NavBar__Content__Actions">
            <Link
              className="NavBar__Content__Actions__Link"
              to="/about"
              onClick={handleClick}
            >
              En savoir plus
            </Link>
            <p className="NavBar__Content__Actions__Email">
              virgilethedream@gmail.com
            </p>
            <div className="NavBar__Content__Actions__Separator"></div>
            <div className="NavBar__Content__Actions__Categories">
              <p className="NavBar__Content__Actions__Categories__Title">
                Par catégories :
              </p>
              <div className="NavBar__Content__Actions__Categories__List">
                {categories.allCategoryType.edges
                  .map(({ node }) => node)
                  .map((category) => (
                    <Link
                      className="MaterialButton"
                      activeClassName="MaterialButton--active"
                      to={`/${category.fields.slug}`}
                      key={category.fields.slug}
                    >
                      {category.name}
                    </Link>
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
