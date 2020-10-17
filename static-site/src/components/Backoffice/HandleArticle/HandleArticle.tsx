import { Category } from "../../../types/categories";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, RouteComponentProps } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";

import { PreSavedArticle } from "../../../types/articles";
import { addArticle, updateArticle } from "../../../actions/articles";
import { getCategories as loadCategories } from "../../../actions/categories";
import { getCategories } from "../../../selectors/categories";
import { getArticle } from "../../../selectors/articles";
import MaterialInput from "../../MaterialInput/MaterialInput";
import MaterialButton from "../../MaterialButton/MaterialButton";
import ImageUploader from "../../ImageUploader/ImageUploader";
import { useFetchData } from "../../useFetchData";

import "./HandleArticle.scss";

const HandleArticle = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const articleToModify = useSelector(getArticle(params.id));
  const categories = useSelector(getCategories);
  const [article, setArticle] = useState<PreSavedArticle>({
    url: "",
    categories: [],
  });
  const [formError, setFormError] = useState("");

  useFetchData<Category[]>(loadCategories, getCategories);

  useEffect(() => {
    if (!!articleToModify && !article.url && article.categories.length === 0) {
      setArticle(articleToModify);
    }
  }, [article, articleToModify]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setArticle({ ...article, [name]: event.target.value });
  };

  const handleClick = () => {
    if (article.url.trim()) {
      params.id
        ? dispatch(updateArticle(article, params.id))
        : dispatch(addArticle(article));
      setFormError("");
      navigate("/admin");
    } else {
      setFormError("All fields are required");
    }
  };

  const handleCategories = (name: string) => {
    if (article.categories.includes(name)) {
      setArticle({
        ...article,
        categories: article.categories.filter((category) => category !== name),
      });
    } else {
      setArticle({
        ...article,
        categories: [...article.categories, name],
      });
    }
  };

  return (
    <div className="HandleArticle">
      <div className="HandleArticle__Content">
        <h3 className="HandleArticle__Content__Subtitle">
          Selection des catégories associées :
        </h3>
        <div className="HandleArticle__Content__Categories">
          {categories.map((category) => (
            <div
              key={category.name}
              className="HandleArticle__Content__Categories__Item"
            >
              <MaterialButton
                isActive={article.categories.includes(category.name)}
                text={category.name}
                handleClick={() => handleCategories(category.name)}
              />
            </div>
          ))}
        </div>
        <ImageUploader item={article} setItem={setArticle} />
        <MaterialButton
          handleClick={handleClick}
          text={params.id ? "Modifier" : "Ajouter"}
        />
        {formError && (
          <p className="HandleArticle__Content__Error">{formError}</p>
        )}
      </div>
    </div>
  );
};

export default HandleArticle;
