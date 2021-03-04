import React, { useState } from "react";
import styles from "./Carousel.module.css";

// TODO
// ref: https://web.dev/carousel-best-practices/
// and https://www.w3.org/TR/wai-aria-practices-1.2/#carousel

// have it scroll automatically (must be able to stop it and screen reader should be apt)
// slide picker control (ie the little dots to pick a slide)

export const Carousel = ({ items }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [direction, setDirection] = useState("forward");

  const handleNext = () => {
    if (activeItem < items.length - 1) {
      setActiveItem(activeItem + 1);
    } else {
      setActiveItem(0);
    }
    setDirection("forward");
  };

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
        <div className={getClassNameForItem(activeItem === i)}>{el}</div>
      ))}
      <div className={styles.btnWrapper}>
        <button className={styles.scrollBtn} onClick={handlePrev}>
          Prev
        </button>
        <button className={styles.scrollBtn} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
