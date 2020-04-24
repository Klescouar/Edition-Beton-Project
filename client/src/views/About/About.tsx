import React from "react";
import { useSelector } from "react-redux";
import { getAbout } from "selectors/about";

import "./About.scss";

const About = () => {
  const about = useSelector(getAbout);
  return (
    <div className="About">
      <h1 className="About__Title">{about.title}</h1>
      <img
        alt=""
        className="About__Image"
        src={`../../../../medias/${about.url}`}
      />
      <p
        className="About__Description"
        dangerouslySetInnerHTML={{ __html: about.description }}
      />
    </div>
  );
};

export default About;
