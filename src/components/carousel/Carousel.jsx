import React, { useState } from "react";
import styles from "./Carousel.module.css";

export const Carousel = ({ items }) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleNext = () => {
    if (activeItem < items.length - 1) {
      setActiveItem(activeItem + 1);
    } else {
      setActiveItem(0);
    }
  };

  const handlePrev = () => {
    if (activeItem > 0) {
      setActiveItem(activeItem - 1);
    } else {
      setActiveItem(items.length - 1);
    }
  };

  return (
    <div>
      <button onClick={handleNext}>Next</button>
      <button onClick={handlePrev}>Prev</button>
      {items.map((el, i) => (
        <div className={activeItem === i ? styles.active : styles.item} key={i}>
          {el}
        </div>
      ))}
    </div>
  );
};
