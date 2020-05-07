import React from "react";
import { Link } from "gatsby";

import "./MaterialLink.scss";

type Props = {
  to: string;
  children: string;
};

const MaterialLink = ({ to, children, ...props }: Props) => (
  <Link
    className="MaterialLink"
    activeClassName="MaterialLink--active"
    to={to}
    {...props}
  >
    {children}
  </Link>
);

export default MaterialLink;
