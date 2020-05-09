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
    .filter((key) => {
      const breakpointKey = <Breakpoint>key;
      return width >= breakpoints[breakpointKey];
    })
    .reduce((keyToKeep, key) => {
      const keyToKeepBreakPoint = <Breakpoint>keyToKeep;
      const keyBreakpoint = <Breakpoint>key;
      return breakpoints[keyToKeepBreakPoint] > breakpoints[keyBreakpoint]
        ? keyToKeepBreakPoint
        : keyBreakpoint;
    }, SMALL) as Breakpoint;
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<Breakpoint>(SMALL);

  const handleResize = () => {
    setScreenSize(getScreenSize(window.innerWidth));
  };

  useEffect(() => {
    // Trigger a calculation once page is loaded
    handleResize();

    window.addEventListener("resize", handleResize);
    // This function is called on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
