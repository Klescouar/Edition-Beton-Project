import { Article } from "types/articles";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import { getArticles } from "selectors/articles";
import RemoveButton from "components/RemoveButton/RemoveButton";
import MaterialButton from "components/MaterialButton/MaterialButton";
import { removeArticle } from "actions/articles";

import "./HandleArticles.scss";

const HandleArticles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const articles = useSelector(getArticles);
  const handleClick = (article: Article) => {
    dispatch(removeArticle(article));
  };

  const handleModify = (id: string) => navigate(`/backoffice/article/${id}`);

  return (
    <div className="HandleArticles">
      <div className="HandleArticles__Content">
        {articles.map((article) => (
          <div key={article._id} className="HandleArticles__Content__Item">
            <div
              className="HandleArticles__Content__Item__Image"
              style={{
                backgroundImage: `url(../../../../medias/${article.url})`,
              }}
            >
              <RemoveButton handleClick={() => handleClick(article)} />
            </div>
            <MaterialButton
              text="Modifier"
              handleClick={() => handleModify(article._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandleArticles;
