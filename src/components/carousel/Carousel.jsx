import React, { useEffect, useState, useCallback } from "react";
import styles from "./Carousel.module.css";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

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
        return `${styles.item} ${styles.active} ${styles.forwardIn}`;
      } else {
        return `${styles.item} ${styles.active} ${styles.backwardIn}`;
      }
    }
  };

  return (
    <section
      className={styles.wrapper}
      aria-roledescription="carousel"
      aria-label="things to be shown"
      aria-atomic="false"
      aria-live={autoScroll ? "off" : "polite"}
    >
      <div className={styles.itemsWrapper}>
        {items.map((el, i) => (
          <div
            className={getClassNameForItem(activeItem === i)}
            key={i}
            role="group"
            aria-roledescription="slide"
          >
            {el}
          </div>
        ))}
      </div>

      <div className={styles.btnWrapper}>
        <button
          className={styles.playBtn}
          onClick={() => setAutoScroll(!autoScroll)}
        >
          {autoScroll ? "Stop autoplay" : "Autoplay"}
        </button>
        <button
          className={styles.scrollBtn}
          onClick={handlePrev}
          disabled={autoScroll}
          aria-label={"scroll left"}
        >
          <FaChevronCircleLeft className={styles.btnIcon} />
        </button>
        <button
          className={styles.scrollBtn}
          onClick={handleNext}
          disabled={autoScroll}
          aria-label={"scroll right"}
        >
          <FaChevronCircleRight className={styles.btnIcon} />
        </button>
      </div>
    </section>
  );
};
