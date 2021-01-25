import React from "react";
import styles from "./Breadcrumb.module.css";

// TODO prop types for links
export const Breadcrumb = ({ links }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.navList}>
        {links.map((link) => {
          if (link.current) {
            return (
              <li>
                <a href={link.link} aria-current="page">
                  {link.label}
                </a>
              </li>
            );
          } else {
            return (
              <li>
                <a href={link.link}>{link.label}</a>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};
