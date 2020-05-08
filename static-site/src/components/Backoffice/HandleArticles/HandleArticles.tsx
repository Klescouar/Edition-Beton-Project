import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, RouteComponentProps } from "@reach/router";

import { Article } from "../../../types/articles";
import { getArticles } from "../../../selectors/articles";
import { getArticles as loadArticles } from "../../../actions/articles";
import RemoveButton from "../../RemoveButton/RemoveButton";
import MaterialButton from "../../MaterialButton/MaterialButton";
import { removeArticle } from "../../../actions/articles";

import "./HandleArticles.scss";
import { useFetchData } from "../../useFetchData";

const HandleArticles = (props: RouteComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const articles = useFetchData<Article[]>(loadArticles, getArticles);

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
                backgroundImage: `url(/medias/${article.url})`,
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
