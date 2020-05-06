import { useState, useEffect } from "react";

const SMALL = "small";
const MEDIUM = "medium";
const LARGE = "large";

type Breakpoint = "small" | "medium" | "large";
type Breakpoints = { [key in Breakpoint]: number };

const BREAKPOINTS: Breakpoints = {
  [SMALL]: 0,
  [MEDIUM]: 767,
  [LARGE]: 1025,
};

export const getScreenSize = (
  width: number,
  breakpoints: Breakpoints = BREAKPOINTS
): Breakpoint => {
  return Object.keys(breakpoints)
    .filter((key: Breakpoint) => width >= breakpoints[key])
    .reduce(
      (keyToKeep: Breakpoint, key: Breakpoint) =>
        breakpoints[keyToKeep] > breakpoints[key] ? keyToKeep : key,
      SMALL
    ) as Breakpoint;
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<Breakpoint>(
    getScreenSize(window.innerWidth)
  );

  const handleResize = () => {
    setScreenSize(getScreenSize(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // This function is called on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
