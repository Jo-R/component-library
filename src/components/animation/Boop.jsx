import React from "react";
import { useSpring, animated } from "react-spring";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// thanks to https://www.joshwcomeau.com/react/boop
// having the hook return style and trigger means can apply trigger to
// a whole div but the animation to just one bit (e.g. see alert: the X animates
// when hover over the box)
// or can just use the component that wraps it to have them on the same element
export const Boop = ({ children, ...boopConfig }) => {
  const [style, trigger] = useBoop(boopConfig);
  return (
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};

export function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isBooped, setIsBooped] = React.useState(false);

  const style = useSpring({
    display: "inline-block", // can apply this to inline children now and have animation
    backfaceVisibility: "hidden", // for gpu/hardware acceleration
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });

  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);

  let applicableStyle = prefersReducedMotion ? {} : style;

  return [applicableStyle, trigger];
}
