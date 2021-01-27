import React from "react";
import { IoIosRefresh } from "react-icons/io";
import styles from "./IconButton.module.css";

export const IconButton = () => {
  return (
    <button className={styles.rounded} aria-label="refresh">
      <IoIosRefresh />
    </button>
  );
};
