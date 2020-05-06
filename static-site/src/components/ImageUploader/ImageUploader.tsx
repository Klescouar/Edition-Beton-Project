import React, { useState } from "react";
// @ts-ignore
import Upload from "../../icons/upload.inline.svg";
// @ts-ignore
import Close from "../../icons/close.inline.svg";

import "./ImageUploader.scss";

type Props = {
  item: any;
  setItem: Function;
};

const ImageUploader = ({ item, setItem }: Props) => {
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
      setItem({ ...item, url: response.files });
      setUploadError("");
    } catch (error) {
      setUploadError(error.message);
    }
  };
  const handleOnClick = () => setItem({ ...item, url: "" });
  return (
    <>
      <div
        className="ImageUploader"
        style={{ backgroundImage: `url(../../../../medias/${item.url})` }}
      >
        <button onClick={handleOnClick} className="ImageUploader__Close">
          {item.url && <Close />}
        </button>
        <input
          className="ImageUploader__Input"
          id="upload"
          onChange={handleUpload}
          type="file"
        />
        <label className="ImageUploader__Label" htmlFor="upload">
          {!item.url && <Upload />}
        </label>
      </div>
      {uploadError && <p className="ImageUploader__Error">{uploadError}</p>}
    </>
  );
};

export default ImageUploader;
