import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import StackGrid from "react-stack-grid";
import Lightbox from "react-image-lightbox";

import useScreenSize from "../components/useScreenSize";
import Layout from "../components/Layout/Layout";

import "../styles/Home.scss";

const Category = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [numberOfItemDisplayed, setNumberOfItemDisplayed] = useState(10);
  const screenSize = useScreenSize();

  const isMobile = screenSize === "small";
  const isDesktop = screenSize === "large";
  const gutterValue =
    screenSize === "large" ? 30 : screenSize === "medium" ? 15 : 10;

  const articles = data.allArticleType.edges.map(({ node }) => node);

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

  const handleClick = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <Layout>
        <div className="Home">
          <StackGrid
            monitorImagesLoaded={true}
            gutterWidth={gutterValue}
            gutterHeight={isMobile ? gutterValue / 2 : gutterValue / 1.2}
            duration={0}
            columnWidth={isDesktop ? "30%" : "50%"}
          >
            {articles
              .sort((a, b) =>
                Math.abs(
                  new Date(b.creationDate).getTime() -
                    new Date(a.creationDate).getTime()
                )
              )
              .map((article, index) => {
                return (
                  index <= numberOfItemDisplayed && (
                    <button
                      className="Home__Article"
                      key={article.id}
                      onClick={() => handleClick(index)}
                    >
                      <img
                        className="Home__Article__Image"
                        src={`http://localhost:4444/medias/${article.url}`}
                        alt=""
                      />
                    </button>
                  )
                );
              })}
          </StackGrid>
          {isOpen && (
            <Lightbox
              mainSrc={`http://localhost:4444/medias/${articles[selectedImageIndex].url}`}
              nextSrc={`http://localhost:4444/medias/${
                articles[
                  selectedImageIndex !== articles.length - 1
                    ? selectedImageIndex + 1
                    : selectedImageIndex
                ].url
              }`}
              prevSrc={`http://localhost:4444/medias/${
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
      </Layout>
    </div>
  );
};

export const query = graphql`
  query($name: [String]) {
    allArticleType(filter: { categories: { in: $name } }) {
      edges {
        node {
          id
          url
          title
        }
      }
    }
  }
`;

export default Category;
