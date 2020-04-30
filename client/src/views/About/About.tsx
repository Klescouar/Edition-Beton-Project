import React from "react";
import { useSelector } from "react-redux";
import { getAbout } from "selectors/about";

import "./About.scss";

const About = () => {
  const about = useSelector(getAbout);
  return (
    <div className="About">
      <img
        alt=""
        className="About__Image"
        src={`../../../../medias/banniere-up_burned.png`}
      />
      <p
        className="About__Description"
        dangerouslySetInnerHTML={{ __html: about.description }}
      />
      <img
        alt=""
        className="About__Image"
        src={`../../../../medias/${about.url}`}
      />
    </div>
  );
};

export default About;
