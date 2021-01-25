import React, { useState, useRef } from "react";
import styles from "./ToggleButton.module.css";

/**
 * For this toggle button, the text changes when toggled so aria-pressed is not needed.
 * It doesn't announce the label change but screen reader users would navigate differently
 * TODO get an understanding of this using nvda
 */
export const ToggleButton = ({
  pressedLabel,
  notPressedLabel,
  onClickHandler = () => {},
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const btnRef = useRef();

  const handleOnClick = () => {
    setIsPressed(!isPressed);
    onClickHandler();
  };

  return (
    <button
      ref={btnRef}
      onClick={handleOnClick}
      className={isPressed ? styles.pressed : undefined}
    >
      {isPressed ? pressedLabel : notPressedLabel}
    </button>
  );
};

/**
 * For this toggle button, the text remains the same when pressed so aria-pressed is needed
 */
export const ToggleButtonAria = ({ label, onClickHandler = () => {} }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleOnClick = () => {
    setIsPressed(!isPressed);
    onClickHandler();
  };

  return (
    <button
      aria-pressed={isPressed}
      onClick={handleOnClick}
      className={isPressed ? styles.pressed : undefined}
    >
      {label}
    </button>
  );
};
