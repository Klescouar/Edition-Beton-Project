import React from "react";
import { ReactComponent as Close } from "assets/icons/close.svg";

import "./RemoveButton.scss";

type Props = {
  handleClick: React.MouseEventHandler<HTMLElement>;
};

const RemoveButton = ({ handleClick }: Props) => {
  return (
    <button className="RemoveButton" onClick={handleClick}>
      <Close />
    </button>
  );
};

export default RemoveButton;
