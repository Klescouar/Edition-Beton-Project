import React, { useState } from "react";
import { useDispatch } from "react-redux";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import { addArticle } from "actions/articles";
import MaterialInput from "components/MaterialInput/MaterialInput";
import MaterialButton from "components/MaterialButton/MaterialButton";
import ImageUploader from "components/ImageUploader/ImageUploader";

import "./AddArticle.scss";

const AddArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: "", url: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setArticle({ ...article, [name]: event.target.value });
  };

  const handleClick = () => {
    if (article.title.trim() && article.url.trim()) {
      dispatch(addArticle(article));
      setFormError("");
      navigate("/backoffice");
    } else {
      setFormError("All fields are required");
    }
  };

  return (
    <div className="AddArticle">
      <div className="AddArticle__Content">
        <MaterialInput
          name="title"
          handleChange={handleChange}
          value={article.title}
          label="Titre"
        />
        <ImageUploader article={article} setArticle={setArticle} />
        <MaterialButton handleClick={handleClick} text="Ajouter" />
        {formError && <p className="AddArticle__Content__Error">{formError}</p>}
      </div>
    </div>
  );
};

export default AddArticle;
