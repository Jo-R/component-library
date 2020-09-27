import React, { createRef, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Accordion.module.css";
import { AccordionSection } from "./AccordionSection";

// TODO
// - allowmultiplopen
// - add a default open option
// - animate showing/hiding of content
// - testing https://storybook.js.org/docs/react/workflows/testing-with-storybook and ?more stories
export const Accordion = ({ items, headingLevel, allowMultipleOpen }) => {
  const [activePanel, setActivePanel] = useState();
  const sectionsRefs = useRef(items.map(() => createRef()));

  const handleHeaderClick = (e) => {
    const targetPanel = e.currentTarget.id;
    if (targetPanel === activePanel) {
      setActivePanel(null);
      return;
    }
    setActivePanel(e.currentTarget.id);
  };

  const handleKeypress = (e) => {
    const targetIndex = parseInt(e.currentTarget.dataset.index);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (targetIndex === items.length - 1) {
          sectionsRefs.current[0].current.focus();
        } else {
          sectionsRefs.current[targetIndex + 1].current.focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (targetIndex === 0) {
          sectionsRefs.current[items.length - 1].current.focus();
        } else {
          sectionsRefs.current[targetIndex - 1].current.focus();
        }
        break;
      case "Home":
        e.preventDefault();
        sectionsRefs.current[0].current.focus();
        break;
      case "End":
        e.preventDefault();
        sectionsRefs.current[items.length - 1].current.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.accordionWrapper}>
      {items.map((el, index) => (
        <AccordionSection
          item={el}
          key={index}
          index={index}
          isActive={activePanel === el.id}
          handleHeaderClick={handleHeaderClick}
          onKeyDown={handleKeypress}
          sectionRef={sectionsRefs.current[index]}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(AccordionSection.propTypes.item).isRequired,
  allowMultipleOpen: PropTypes.bool,
  headingLevel: PropTypes.number,
};

Accordion.defaultProps = {
  allowMultipleOpen: false,
};
