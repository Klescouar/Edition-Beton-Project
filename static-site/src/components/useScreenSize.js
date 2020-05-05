import { useState, useEffect } from "react";

const SMALL = "small";
const MEDIUM = "medium";
const LARGE = "large";

const BREAKPOINTS = {
  [SMALL]: 0,
  [MEDIUM]: 767,
  [LARGE]: 1025,
};

export const getScreenSize = (width, breakpoints = BREAKPOINTS) => {
  return Object.keys(breakpoints)
    .filter((key) => width >= breakpoints[key])
    .reduce(
      (keyToKeep, key) =>
        breakpoints[keyToKeep] > breakpoints[key] ? keyToKeep : key,
      SMALL
    );
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(1280);

  const handleResize = () => {
    setScreenSize(getScreenSize(window.innerWidth));
  };

  useEffect(() => {
    setScreenSize(getScreenSize(window.innerWidth));
    window.addEventListener("resize", handleResize);

    // This function is called on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
