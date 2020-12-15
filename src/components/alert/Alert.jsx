import React from "react";
import styles from "./Alert.module.css";
import { FaCheckSquare, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useBoop } from "../animation/Boop";
import { animated } from "react-spring";

export const Alert = ({ message, isSuccess, onClose }) => {
  const [style, trigger] = useBoop({ y: 2 });

  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <div role="alert" className={styles.wrapper} onMouseEnter={trigger}>
        <animated.span style={style} onClick={onClose}>
          <FaTimes size={"1rem"} color={"lightslategray"} />
        </animated.span>
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
