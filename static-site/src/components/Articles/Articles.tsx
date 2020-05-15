import { ArticlesListType, Article } from "../../types/articles";

import React, { useState, useEffect } from "react";
// @ts-ignore
import StackGrid from "react-stack-grid";
import Lightbox from "react-image-lightbox";
import Img from "gatsby-image";

import useScreenSize from "../useScreenSize";

import "./Articles.scss";

type Props = {
  articles: ArticlesListType;
};

const Articles = ({ articles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [numberOfItemDisplayed, setNumberOfItemDisplayed] = useState(10);
  const screenSize: string = useScreenSize();

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
    setIsOpen((wasOpen) => !wasOpen);
  };

  return (
    <div className="Articles">
      <StackGrid
        monitorImagesLoaded={true}
        gutterWidth={gutterValue}
        gutterHeight={isMobile ? gutterValue / 2 : gutterValue / 1.2}
        duration={0}
        columnWidth={isDesktop ? "30%" : "50%"}
      >
        {articles
          .sort(
            (a: Article, b: Article) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          )
          .map((article: Article, index: number) => {
            return (
              index <= numberOfItemDisplayed &&
              article.image?.childImageSharp?.fluid && (
                <button
                  className="Articles__Article"
                  key={article.id}
                  onClick={() => handleClick(index)}
                  aria-label={`Afficher ${article.title}`}
                >
                  <Img
                    className="Articles__Article__Image"
                    fluid={article.image.childImageSharp.fluid}
                    alt=""
                  />
                </button>
              )
            );
          })}
      </StackGrid>
      {isOpen && (
        <Lightbox
          mainSrc={articles[selectedImageIndex].fields.imageUrl}
          nextSrc={
            articles[Math.min(articles.length - 1, selectedImageIndex + 1)]
              .fields.imageUrl
          }
          prevSrc={
            articles[Math.max(0, selectedImageIndex - 1)].fields.imageUrl
          }
          enableZoom={false}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            selectedImageIndex > 0 &&
            setSelectedImageIndex((prevIndex) => prevIndex - 1)
          }
          onMoveNextRequest={() =>
            selectedImageIndex < articles.length - 1 &&
            setSelectedImageIndex((prevIndex) => prevIndex + 1)
          }
        />
      )}
    </div>
  );
};

export default Articles;
