import React, { useState } from "react";
import Upload from "../../icons/upload.inline.svg";
import Close from "../../icons/close.inline.svg";
import { Loader } from "../Loader/Loader";

import "./ImageUploader.scss";

type Props = {
  item: any;
  setItem: Function;
};

const ImageUploader = ({ item, setItem }: Props) => {
  const [uploadError, setUploadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    const form = new FormData();
    form.append("files", files[0], files[0].name);

    try {
      setIsLoading(true);
      let request = await fetch("/api/upload", {
        method: "post",
        body: form,
      });
      const response = await request.json();

      if (request.status === 400) {
        setIsLoading(false);
        throw new Error(response.message);
      }
      setIsLoading(false);
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
        style={{
          backgroundImage: `url(https://virgile.s3.eu-west-3.amazonaws.com/${item.url})`,
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
          </>
        )}
      </div>
      {uploadError && <p className="ImageUploader__Error">{uploadError}</p>}
    </>
  );
};

export default ImageUploader;
