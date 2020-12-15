import React from "react";
import styles from "./Alert.module.css";
import { FaCheckSquare, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useBoop } from "../animation/Boop";
import { animated } from "react-spring";

export const Alert = ({ message, isSuccess, onClose }) => {
  const [style, trigger] = useBoop({ y: 2 });

  // using the icon context as a reminder that it's there!
  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <div role="alert" className={styles.wrapper} onMouseEnter={trigger}>
        <animated.button
          style={style}
          onClick={onClose}
          className={styles.button}
        >
          <FaTimes size={"1rem"} color={"lightslategray"} />
        </animated.button>
        <div className={styles.content}>
          {isSuccess ? (
            <FaCheckSquare color={"green"} />
          ) : (
            <FaExclamationCircle color={"red"} />
          )}
          <p>{message}</p>
        </div>
      </div>
    </IconContext.Provider>
  );
};
