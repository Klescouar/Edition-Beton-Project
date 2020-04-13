import React from "react";

import "./MaterialButton.scss";

type Props = {
  handleClick: React.MouseEventHandler<HTMLElement>;
  text: string;
};

const MaterialButton = ({ handleClick, text }: Props) => (
  <button onClick={handleClick} className="MaterialButton">
    {text}
  </button>
);

export default MaterialButton;
