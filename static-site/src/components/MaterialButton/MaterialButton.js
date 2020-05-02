import React from "react";
import classNames from "classnames";
import "./MaterialButton.scss";

const MaterialButton = ({
  handleClick,
  text,
  isActive = false,
  children = text,
}) => (
  <button
    onClick={handleClick}
    className={classNames("MaterialButton", {
      "MaterialButton--active": isActive,
    })}
  >
    {children}
  </button>
);

export default MaterialButton;
