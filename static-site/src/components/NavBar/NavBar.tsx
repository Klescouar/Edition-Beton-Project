import { Categories } from "../../types/categories";
import { Logo } from "../../types/logo";

import React from "react";
import classNames from "classnames";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import { useLogo } from "../useLogo";
import MaterialLink from "../MaterialLink/MaterialLink";

import CloseIcon from "../../icons/closeMenu.inline.svg";

import "./NavBar.scss";

type Props = {
  isMobile: boolean;
  setMenuIsOpen: Function;
  menuIsOpen: boolean;
};

const NavBar = ({ isMobile, setMenuIsOpen, menuIsOpen }: Props) => {
  const handleClick = () => {
    setMenuIsOpen(false);
  };

  const logo: Logo = useLogo();
  const categories: Categories = useStaticQuery(graphql`
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
        <Link className="NavBar__Content__Logo" to="/" title="Page d'accueil">
          <Img fluid={logo.image.childImageSharp.fluid} alt="" />
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
                    <MaterialLink
                      key={category.fields.slug}
                      to={`/${category.fields.slug}`}
                    >
                      {category.name}
                    </MaterialLink>
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
