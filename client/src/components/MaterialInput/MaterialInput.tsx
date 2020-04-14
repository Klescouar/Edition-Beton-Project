import React from "react";

import "./MaterialInput.scss";

type Props = {
  handleChange: React.FormEventHandler<HTMLInputElement>;
  value: string;
  label: string;
  name: string;
  type?: string;
};

const MaterialInput = ({
  handleChange,
  value,
  label,
  name,
  type = "text",
}: Props) => {
  return (
    <div className="MaterialInput">
      <input
        onChange={handleChange}
        name={name}
        value={value}
        className="MaterialInput__Input"
        placeholder=" "
        type={type}
      />
      <span className="MaterialInput__Highlight"></span>
      <span className="MaterialInput__Bar"></span>
      <label>{label}</label>
    </div>
  );
};

export default MaterialInput;
