import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";

import { About } from "../../../types/about";
import { updateAbout, getAbout as loadAbout } from "../../../actions/about";
import { getAbout } from "../../../selectors/about";
import MaterialInput from "../../MaterialInput/MaterialInput";
import MaterialButton from "../../MaterialButton/MaterialButton";
import ImageUploader from "../../ImageUploader/ImageUploader";

import "./HandleAbout.scss";
import { useFetchData } from "../../useFetchData";

const ReactQuill = React.lazy(() => import("react-quill"));

const HandleAbout = (props: RouteComponentProps) => {
  const savedAbout = useFetchData<About>(loadAbout, getAbout);

  const dispatch = useDispatch();
  const [about, setAbout] = useState<About>(savedAbout);
  const [aboveImage, setAboveImage] = useState({ url: "" });
  const [bottomImage, setBottomImage] = useState({ url: "" });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (savedAbout.title) setAbout(savedAbout);
    if (savedAbout.aboveImage) setAboveImage({ url: savedAbout.aboveImage });
    if (savedAbout.bottomImage) setBottomImage({ url: savedAbout.bottomImage });
  }, [savedAbout]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setAbout({ ...about, [name]: event.target.value });
  };

  const handleClick = () => {
    if (about.title.trim() && aboveImage.url.trim() && bottomImage.url.trim()) {
      dispatch(
        updateAbout({
          ...about,
          aboveImage: aboveImage.url,
          bottomImage: bottomImage.url,
        })
      );
      setFormError("");
    } else {
      setFormError("All fields are required");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
    ],
  };

  const formats = [
    "header",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
  ];

  return (
    <div className="HandleAbout">
      <div className="HandleAbout__Content">
        <MaterialInput
          name="title"
          handleChange={handleChange}
          value={about.title}
          label="Titre"
        />
        <ImageUploader item={aboveImage} setItem={setAboveImage} />
        <div className="HandleAbout__Content__Editor">
          <Suspense fallback={<div />}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={about.description}
              onChange={(description) =>
                setAbout({ ...about, description: description })
              }
            />
          </Suspense>
        </div>
        <ImageUploader item={bottomImage} setItem={setBottomImage} />
        <MaterialButton handleClick={handleClick} text={"Envoyer"} />
        {formError && (
          <p className="HandleAbout__Content__Error">{formError}</p>
        )}
      </div>
    </div>
  );
};

export default HandleAbout;
