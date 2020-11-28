import React from "react";
import { useContext } from "react";
import { useRef, useState, useMemo } from "react";
import styles from "../Accordion.module.css";
import {
  AccordionContext,
  AccordionDescendantProvider,
  AccordionItemContext,
  useDescendant,
} from "./AccordionContext";

export const Accordion = ({ children }) => {
  const [descendants, setDescendants] = useState([]);
  const [currentOpenPanel, setCurrentOpenPanel] = useState(0);

  const accordionCtxValues = useMemo(
    () => ({
      accordionId: "accordion",
      currentOpenPanel,
      onSelectPanel: setCurrentOpenPanel,
    }),
    [currentOpenPanel]
  );
  return (
    <AccordionDescendantProvider items={descendants} set={setDescendants}>
      <AccordionContext.Provider value={accordionCtxValues}>
        <div>{children}</div>
      </AccordionContext.Provider>
    </AccordionDescendantProvider>
  );
};

export const AccordionItem = ({ children }) => {
  const { accordionId, currentOpenPanel } = useContext(AccordionContext);
  const btnRef = useRef(null);
  const index = useDescendant({ element: btnRef.current });

  const itemId = `${accordionId}-${index}`;
  const panelId = `panel-${itemId}`;
  const buttonId = `button-${itemId}`;

  const itemCtxValues = {
    btnRef,
    index,
    panelId,
    buttonId,
    isActive: currentOpenPanel === index,
  };

  return (
    <AccordionItemContext.Provider value={itemCtxValues}>
      <div>{children}</div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionButton = ({ children, ...props }) => {
  const { btnRef, index, buttonId, panelId } = useContext(AccordionItemContext);
  const { onSelectPanel } = useContext(AccordionContext);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    btnRef.current.focus();
    onSelectPanel(index);
  }

  // let handleKeyDown = (event) => {
  //   switch (event.key) {
  //     case "ArrowDown":
  //       if (orientation === "vertical" || orientation === "both") {
  //         event.preventDefault();
  //         let next = getNextOption();
  //         callback(key === "option" ? next : next[key]);
  //       }
  //       break;
  //     case "ArrowUp":
  //       if (orientation === "vertical" || orientation === "both") {
  //         event.preventDefault();
  //         let prev = getPreviousOption();
  //         callback(key === "option" ? prev : prev[key]);
  //       }
  //       break;
  //     case "PageUp":
  //       event.preventDefault();
  //       let prevOrFirst = (event.ctrlKey
  //         ? getPreviousOption
  //         : getFirstOption)();
  //       callback(key === "option" ? prevOrFirst : prevOrFirst[key]);
  //       break;
  //     case "Home":
  //       event.preventDefault();
  //       let first = getFirstOption();
  //       callback(key === "option" ? first : first[key]);
  //       break;
  //     case "PageDown":
  //       event.preventDefault();
  //       let nextOrLast = (event.ctrlKey ? getNextOption : getLastOption)();
  //       callback(key === "option" ? nextOrLast : nextOrLast[key]);
  //       break;
  //     case "End":
  //       event.preventDefault();
  //       let last = getLastOption();
  //       callback(key === "option" ? last : last[key]);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  return (
    <button
      type="button"
      aria-expanded={true}
      aria-controls={panelId}
      id={buttonId}
      className={styles.accordionBtn}
      onClick={handleClick}
      ref={btnRef}
      {...props}
    >
      {children}
    </button>
  );
};

export const AccordionPanel = ({ children }) => {
  const { panelId, buttonId, isActive } = useContext(AccordionItemContext);
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={buttonId}
      className={
        !isActive
          ? `${styles.accordionPanel} ${styles.hidden}`
          : styles.accordionPanel
      }
    >
      {children}
    </div>
  );
};
