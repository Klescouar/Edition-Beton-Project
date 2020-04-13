import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArticles } from "selectors/articles";
import { ReactComponent as Close } from "assets/icons/close.svg";
import { removeArticle } from "actions/articles";

import "./Articles.scss";

const Articles = () => {
  const dispatch = useDispatch();
  const articles = useSelector(getArticles);
  const handleClick = (id: string) => {
    dispatch(removeArticle(id));
  };

  return (
    <div className="Articles">
      <div className="Articles__Content">
        {articles.map((article) => (
          <div
            key={article._id}
            className="Articles__Content__Item"
            style={{
              backgroundImage: `url(../../../../medias/${article.url})`,
            }}
          >
            <button
              className="Articles__Content__Item__Remove"
              onClick={() => handleClick(article._id)}
            >
              <Close />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
