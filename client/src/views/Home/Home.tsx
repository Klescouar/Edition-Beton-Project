import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import StackGrid from "react-stack-grid";
import classNames from "classnames";
import Headroom from "react-headroom";
import Lightbox from "react-image-lightbox";
import { getArticles } from "selectors/articles";
import useScreenSize from "utils/useScreenSize";
import HomeNav from "components/HomeNav/HomeNav";
import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";

import "./Home.scss";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [numberOfItemDisplayed, setNumberOfItemDisplayed] = useState(10);
  const [categorySelected, setCategorySelected] = useState("");
  const screenSize = useScreenSize();
  const articles = useSelector(getArticles);
  const isMobile = screenSize === "small";
  const isDesktop = screenSize === "large";
  const gutterValue =
    screenSize === "large" ? 30 : screenSize === "medium" ? 15 : 10;

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 150 &&
        articles.length
      ) {
        setNumberOfItemDisplayed(numberOfItemDisplayed + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [articles, numberOfItemDisplayed]);

  const handleClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(!isOpen);
  };

  const handleMenu = () => {
    setMenuIsOpen(true);
  };

  return (
    <div
      className={classNames("Home", {
        "Home--withMenu": menuIsOpen,
      })}
    >
      <HomeNav
        isMobile={isMobile}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        setCategorySelected={setCategorySelected}
        categorySelected={categorySelected}
      />
      <div
        className={classNames("Home__Content", {
          "Home__Content--withMenu": menuIsOpen,
        })}
      >
        {!menuIsOpen && isMobile && (
          <Headroom>
            <div className="Home__Nav">
              <img
                className="Home__Nav__Logo"
                src={require("../../assets/images/beton.png")}
                alt=""
              />
              <button className="Home__Nav__Button" onClick={handleMenu}>
                <MenuIcon />
              </button>
            </div>
          </Headroom>
        )}
        <div className="Home__Content__List">
          <StackGrid
            monitorImagesLoaded={true}
            gutterWidth={gutterValue}
            gutterHeight={isMobile ? gutterValue / 2 : gutterValue / 1.2}
            duration={0}
            columnWidth={isDesktop ? "30%" : "50%"}
          >
            {articles
              .filter(
                (article) =>
                  !categorySelected ||
                  article.categories.includes(categorySelected)
              )
              .map((article, index) => {
                return (
                  index <= numberOfItemDisplayed && (
                    <button
                      className="Home__Content__List__Article"
                      key={article._id}
                      onClick={() => handleClick(index)}
                    >
                      <img
                        className="Home__Content__List__Article__Image"
                        src={`../../../../medias/${article.url}`}
                        alt=""
                      />
                    </button>
                  )
                );
              })}
          </StackGrid>
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={`../../../../medias/${articles[selectedImageIndex].url}`}
          nextSrc={`../../../../medias/${
            articles[
              selectedImageIndex !== articles.length - 1
                ? selectedImageIndex + 1
                : selectedImageIndex
            ].url
          }`}
          prevSrc={`../../../../medias/${
            articles[
              selectedImageIndex !== 0
                ? selectedImageIndex - 1
                : selectedImageIndex
            ].url
          }`}
          enableZoom={false}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            selectedImageIndex !== 0 &&
            setSelectedImageIndex(selectedImageIndex - 1)
          }
          onMoveNextRequest={() =>
            selectedImageIndex !== articles.length - 1 &&
            setSelectedImageIndex(selectedImageIndex + 1)
          }
        />
      )}
    </div>
  );
};

export default Home;
