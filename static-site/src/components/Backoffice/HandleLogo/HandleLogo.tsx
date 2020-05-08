import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";

import { updateLogo, loadLogo } from "../../../actions/logo";
import { getLogo } from "../../../selectors/logo";
import ImageUploader from "../../ImageUploader/ImageUploader";
import MaterialButton from "../../MaterialButton/MaterialButton";

import "./HandleLogo.scss";
import { Logo } from "../../../types/logo";
import { useFetchData } from "../../useFetchData";

const HandleLogo = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const savedLogo = useFetchData<Logo>(loadLogo, getLogo);

  const [logo, setLogo] = useState({ url: "" });

  useEffect(() => {
    if (savedLogo) {
      setLogo(savedLogo);
    }
  }, [savedLogo]);

  const handleClick = () => {
    dispatch(updateLogo(logo));
  };

  return (
    <div className="HandleLogo">
      <ImageUploader item={logo} setItem={setLogo} />
      <MaterialButton text="Choisir" handleClick={handleClick} />
    </div>
  );
};

export default HandleLogo;
