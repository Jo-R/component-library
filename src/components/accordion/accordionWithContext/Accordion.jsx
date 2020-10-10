import React from "react";
import { useContext } from "react";
import { useRef, useState } from "react";
import styles from "../Accordion.module.css";
import {AccordionDescendantProvider, AccordionDescendantContext} from "./AccordionContext";

export const Accordion = ({ children }) => {
  const [descendants, setDescendants] = useState([]);
  console.log(descendants);
  return (
    <AccordionDescendantProvider items={descendants} set={setDescendants}>
      <div>{children}</div>
    </AccordionDescendantProvider>
  );
};

export const AccordionItem = ({ children }) => {
  const testRef = useRef(null);
  const { registerDescendant } = useContext(AccordionDescendantContext);
  registerDescendant(testRef.current);
  return <div ref={testRef}>{children}</div>;
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
