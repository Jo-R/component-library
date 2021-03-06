import React, { useState } from "react";
import styles from "./ToggleButton.module.css";

/**
 * For this toggle button, the text changes when toggled so aria-pressed is not needed.
 */
export const ToggleButton = ({
  pressedLabel,
  notPressedLabel,
  onClickHandler = () => {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleOnClick = () => {
    setIsPressed(!isPressed);
    onClickHandler();
  };

  return (
    <button
      onClick={handleOnClick}
      className={isPressed ? styles.pressed : styles.initial}
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
