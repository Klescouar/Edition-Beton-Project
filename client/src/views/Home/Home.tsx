import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import StackGrid from "react-stack-grid";
import Lightbox from "react-image-lightbox";
import { getArticles } from "selectors/articles";
import Menu from "components/Menu/Menu";

import "./Home.scss";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const articles = useSelector(getArticles);

  const listenToScroll = () => setScrollPosition(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);

    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  });

  const handleClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(!isOpen);
  };

  return (
    <div className="Home">
      <Menu isMinified={scrollPosition > 0} />
      <div className="Home__Content">
        <StackGrid
          monitorImagesLoaded={true}
          gutterWidth={30}
          gutterHeight={30}
          duration={0}
          columnWidth={400}
        >
          {articles.map((article, index) => (
            <button
              className="Home__Content__Article"
              key={article._id}
              onClick={() => handleClick(index)}
            >
              <img
                className="Home__Content__Article__Image"
                src={`../../../../medias/${article.url}`}
                alt=""
              />
            </button>
          ))}
        </StackGrid>
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
