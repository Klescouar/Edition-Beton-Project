import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import "./MaterialLink.scss";

type Props = {
  to: string;
  children: string;
  isActive?: boolean;
};

const MaterialLink = ({ to, children, isActive, ...props }: Props) => (
  <Link
    className={classNames("MaterialLink", {
      "MaterialLink--active": isActive,
    })}
    activeClassName="MaterialLink--active"
    to={to}
    {...props}
  >
    {children}
  </Link>
);

export default MaterialLink;
