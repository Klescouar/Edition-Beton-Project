import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "@reach/router";

import { Article } from "../../../types/articles";
import { getArticles } from "../../../selectors/articles";
import { getArticles as loadArticles } from "../../../actions/articles";
import RemoveButton from "../../RemoveButton/RemoveButton";
import { removeArticle } from "../../../actions/articles";

import "./HandleArticles.scss";
import { useFetchData } from "../../useFetchData";
import MaterialLink from "../../MaterialLink/MaterialLink";

const HandleArticles = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const articles = useFetchData<Article[]>(loadArticles, getArticles);

  const handleClick = (article: Article) => {
    dispatch(removeArticle(article));
  };

  return (
    <div className="HandleArticles">
      <div className="HandleArticles__Content">
        {articles.map((article) => (
          <div key={article._id} className="HandleArticles__Content__Item">
            <div
              className="HandleArticles__Content__Item__Image"
              style={{
                backgroundImage: `url(https://virgile.s3.eu-west-3.amazonaws.com/${article.url})`,
              }}
            >
              <RemoveButton handleClick={() => handleClick(article)} />
            </div>
            <MaterialLink to={`/admin/dashboard/article/${article._id}`}>
              Modifier
            </MaterialLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandleArticles;
