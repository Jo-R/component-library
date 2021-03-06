import React, { useEffect, useState, useCallback } from "react";
import styles from "./Carousel.module.css";

// TODO
// ref: https://web.dev/carousel-best-practices/
// and https://www.w3.org/TR/wai-aria-practices-1.2/#carousel

// slide picker control (ie the little dots to pick a slide)
// ? make it swipeable?

export const Carousel = ({ items, transitionTime = 2000 }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [autoScroll, setAutoScroll] = useState(transitionTime > 0);

  const handleNext = useCallback(() => {
    setActiveItem((i) => {
      const next = i + 1;
      if (next < items.length) {
        return next;
      } else {
        return 0;
      }
    });
    setDirection("forward");
  }, [items]);

  useEffect(() => {
    let timer;
    if (autoScroll) {
      timer = setInterval(handleNext, transitionTime);
    }
    return () => clearInterval(timer);
  }, [autoScroll, handleNext, transitionTime]);

  const handlePrev = () => {
    if (activeItem > 0) {
      setActiveItem(activeItem - 1);
    } else {
      setActiveItem(items.length - 1);
    }
    setDirection("backward");
  };

  const getClassNameForItem = (isActive) => {
    if (!isActive) {
      return `${styles.item} ${styles.hidden}`;
    } else {
      if (direction === "forward") {
        return `${styles.item} ${styles.active} ${styles.forward}`;
      } else {
        return `${styles.item} ${styles.active} ${styles.backward}`;
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {items.map((el, i) => (
        <div className={getClassNameForItem(activeItem === i)} key={i}>
          {el}
        </div>
      ))}
      <div className={styles.btnWrapper}>
        <button className={styles.scrollBtn} onClick={handlePrev}>
          Prev
        </button>
        <button className={styles.scrollBtn} onClick={handleNext}>
          Next
        </button>
        <button
          className={styles.scrollBtn}
          onClick={() => setAutoScroll(!autoScroll)}
        >
          Toggle auto scroll
        </button>
      </div>
    </div>
  );
};
