import React from "react";
import { useContext } from "react";
import { useRef, useState } from "react";
import styles from "../Accordion.module.css";
import {AccordionDescendantProvider, AccordionItemContext, useDescendent} from "./AccordionContext";

export const Accordion = ({ children }) => {
  const [descendants, setDescendants] = useState([]);
  return (
    <AccordionDescendantProvider items={descendants} set={setDescendants}>
      <div>{children}</div>
    </AccordionDescendantProvider>
  );
};

export const AccordionItem = ({ children }) => {
  const testRef = useRef(null);
  const index = useDescendent(testRef.current);
  
  const itemCtxValues = {
    testRef,
    index
  };
  return (
    <AccordionItemContext.Provider value={itemCtxValues}>
      <div>{children}</div>
    </AccordionItemContext.Provider>
  
  );
};

export const AccordionButton = ({ children, ...props }) => {
  const {testRef} = useContext(AccordionItemContext);
  return (
    <button
      type="button"
      aria-expanded={true}
      aria-controls={`section`}
      id={"ID"}
      className={styles.accordionBtn}
      onClick={() => console.log("click")}
      ref={testRef}
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
