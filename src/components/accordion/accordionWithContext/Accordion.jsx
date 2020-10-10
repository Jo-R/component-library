import React from "react";
import styles from "../Accordion.module.css";
import { DescendantProvider } from "./AccordionContext";
import AccordionDescendantContext from "./AccordionContext";

export const Accordion = ({ children }) => {
  return (
    <DescendantProvider
      context={AccordionDescendantContext}
      items={descendants}
      set={setDescendants}
    >
      <div>{children}</div>
    </DescendantProvider>
  );
};

export const AccordionItem = ({ children }) => {
  return <div>{children}</div>;
};

export const AccordionButton = ({ children, ...props }) => {
  return (
    <button
      type="button"
      aria-expanded={true}
      aria-controls={`section`}
      id={"ID"}
      className={styles.accordionBtn}
      onClick={() => console.log("click")}
      {...props}
    >
      {children}
    </button>
  );
};

export const AccordionPanel = ({ children }) => {
  return (
    <div
      id={`section`}
      role="region"
      aria-labelledby={"ID"}
      className={styles.accordionPanel}
    >
      {children}
    </div>
  );
};
