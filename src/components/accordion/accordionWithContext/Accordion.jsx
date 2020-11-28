import React from "react";
import { useContext, createContext } from "react";
import { useRef, useState, useMemo } from "react";
import styles from "../Accordion.module.css";
import {
  AccordionDescendantProvider,
  useDescendant,
} from "./AccordionDescendents";

const AccordionContext = createContext();
const AccordionItemContext = createContext();

export const AccordionCtx = ({ children }) => {
  const [descendants, setDescendants] = useState([]);
  const [currentOpenPanel, setCurrentOpenPanel] = useState();

  const accordionCtxValues = useMemo(
    () => ({
      accordionId: "accordion",
      currentOpenPanel,
      onSelectPanel: setCurrentOpenPanel,
      descendants,
    }),
    [currentOpenPanel, descendants]
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
  const { descendants } = useContext(AccordionContext);
  const { onSelectPanel } = useContext(AccordionContext);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    btnRef.current.focus();
    onSelectPanel(index);
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (index === descendants.length - 1) {
          descendants[0].element.focus();
        } else {
          descendants[index + 1].element.focus();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (index === 0) {
          descendants[descendants.length - 1].element.focus();
        } else {
          descendants[index - 1].element.focus();
        }
        break;
      case "Home":
        event.preventDefault();
        descendants[0].element.focus();
        break;
      case "End":
        event.preventDefault();
        descendants[descendants.length - 1].element.focus();
        break;
      default:
        return;
    }
  };

  return (
    <button
      type="button"
      aria-expanded={true}
      aria-controls={panelId}
      id={buttonId}
      className={styles.accordionBtn}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={btnRef}
      {...props}
    >
      {children}
    </button>
  );
};

export const AccordionPanel = ({ children, ...props }) => {
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
      {...props}
    >
      {children}
    </div>
  );
};
