import React from "react";
import classNames from "classnames";
import "./MaterialButton.scss";

type Props = {
  handleClick: React.MouseEventHandler<HTMLElement>;
  text: string;
  isActive?: boolean;
};

const MaterialButton = ({ handleClick, text, isActive = false }: Props) => (
  <button
    onClick={handleClick}
    className={classNames("MaterialButton", {
      "MaterialButton--active": isActive,
    })}
  >
    {text}
  </button>
);

export default MaterialButton;
