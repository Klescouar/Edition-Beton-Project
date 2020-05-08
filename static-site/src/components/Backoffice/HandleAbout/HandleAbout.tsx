import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";
import ReactQuill from "react-quill";

import { About } from "../../../types/about";
import { updateAbout, getAbout as loadAbout } from "../../../actions/about";
import { getAbout } from "../../../selectors/about";
import MaterialInput from "../../MaterialInput/MaterialInput";
import MaterialButton from "../../MaterialButton/MaterialButton";
import ImageUploader from "../../ImageUploader/ImageUploader";

import "./HandleAbout.scss";
import { useFetchData } from "../../useFetchData";

const HandleAbout = (props: RouteComponentProps) => {
  const savedAbout = useFetchData<About>(loadAbout, getAbout);

  const dispatch = useDispatch();
  const [about, setAbout] = useState<About>(savedAbout);

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (savedAbout.title) setAbout(savedAbout);
  }, [savedAbout]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setAbout({ ...about, [name]: event.target.value });
  };

  const handleClick = () => {
    if (about.title.trim() && about.url.trim()) {
      dispatch(updateAbout(about));
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
        <div className="HandleAbout__Content__Editor">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={about.description}
            onChange={(description) =>
              setAbout({ ...about, description: description })
            }
          />
        </div>
        <ImageUploader item={about} setItem={setAbout} />
        <MaterialButton handleClick={handleClick} text={"Envoyer"} />
        {formError && (
          <p className="HandleAbout__Content__Error">{formError}</p>
        )}
      </div>
    </div>
  );
};

export default HandleAbout;
