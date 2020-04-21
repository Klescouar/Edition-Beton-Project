import { About } from "types/about";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
// @ts-ignore
import { updateAbout } from "actions/about";
import { getAbout } from "selectors/about";
import MaterialInput from "components/MaterialInput/MaterialInput";
import MaterialButton from "components/MaterialButton/MaterialButton";
import ImageUploader from "components/ImageUploader/ImageUploader";

import "./HandleAbout.scss";

const HandleAbout = () => {
  const editor = useRef(null);
  const savedAbout = useSelector(getAbout);
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

  return (
    <div className="HandleAbout">
      <div className="HandleArticle__Content">
        <MaterialInput
          name="title"
          handleChange={handleChange}
          value={about.title}
          label="Titre"
        />
        <div className="HandleAbout__Content__Editor">
          <JoditEditor
            ref={editor}
            value={about.description}
            config={{
              readonly: false, // all options from https://xdsoft.net/jodit/doc/
            }}
            onBlur={(description) =>
              setAbout({ ...about, description: description })
            } // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </div>
        <ImageUploader item={about} setItem={setAbout} />
        {/* <MaterialTextArea
          name="description"
          handleChange={handleChange}
          value={about.description}
          label="Description"
        /> */}
        <MaterialButton handleClick={handleClick} text={"Envoyer"} />
        {formError && (
          <p className="HandleArticle__Content__Error">{formError}</p>
        )}
      </div>
    </div>
  );
};

export default HandleAbout;
