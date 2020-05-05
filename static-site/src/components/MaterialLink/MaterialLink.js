import React from "react";
import { Link } from "gatsby";

import "./MaterialLink.scss";

const MaterialLink = ({ to, children, ...props }) => (
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
