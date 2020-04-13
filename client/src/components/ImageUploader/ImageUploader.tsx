import { preSavedArticle } from "types/articles";

import React from "react";
import { ReactComponent as Upload } from "assets/icons/upload.svg";
import { ReactComponent as Close } from "assets/icons/close.svg";

import "./ImageUploader.scss";

type Props = {
  onChange: React.FormEventHandler<HTMLInputElement>;
  article: preSavedArticle;
  setArticle: Function;
};

const ImageUploader = ({ onChange, article, setArticle }: Props) => {
  const handleOnClick = () => setArticle({ ...article, url: "" });
  return (
    <div
      className="ImageUploader"
      style={{ backgroundImage: `url(../../../../medias/${article.url})` }}
    >
      <button onClick={handleOnClick} className="ImageUploader__Close">
        {article.url && <Close />}
      </button>
      <input
        className="ImageUploader__Input"
        id="upload"
        onChange={onChange}
        type="file"
      />
      <label className="ImageUploader__Label" htmlFor="upload">
        {!article.url && <Upload />}
      </label>
    </div>
  );
};

export default ImageUploader;
