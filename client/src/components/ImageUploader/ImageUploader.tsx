import { PreSavedArticle } from "types/articles";

import React, { useState } from "react";
import { ReactComponent as Upload } from "assets/icons/upload.svg";
import { ReactComponent as Close } from "assets/icons/close.svg";

import "./ImageUploader.scss";

type Props = {
  article: PreSavedArticle;
  setArticle: Function;
};

const ImageUploader = ({ article, setArticle }: Props) => {
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    const form = new FormData();
    form.append("files", files[0], files[0].name);

    try {
      let request = await fetch("/upload", {
        method: "post",
        body: form,
      });
      const response = await request.json();

      if (request.status === 400) throw new Error(response.message);
      setArticle({ ...article, url: response.files });
      setUploadError("");
    } catch (error) {
      setUploadError(error.message);
    }
  };
  const handleOnClick = () => setArticle({ ...article, url: "" });
  return (
    <>
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
          onChange={handleUpload}
          type="file"
        />
        <label className="ImageUploader__Label" htmlFor="upload">
          {!article.url && <Upload />}
        </label>
      </div>
      {uploadError && <p className="ImageUploader__Error">{uploadError}</p>}
    </>
  );
};

export default ImageUploader;
