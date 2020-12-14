import React from "react";
import styles from "./Alert.module.css";
import { FaCheckSquare, FaExclamationCircle } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export const Alert = ({ message, isSuccess }) => {
  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <div role="alert" className={styles.wrapper}>
        {isSuccess ? (
          <FaCheckSquare className={styles.success} />
        ) : (
          <FaExclamationCircle className={styles.error} />
        )}
        <p>{message}</p>
      </div>
    </IconContext.Provider>
  );
};
