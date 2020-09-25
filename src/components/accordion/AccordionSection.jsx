import React from "react";
import PropTypes from 'prop-types';
import { FaChevronDown } from "react-icons/fa"
import styles from "./Accordion.module.css";

export const AccordionSection = ({ item, index, isActive, handleHeaderClick, sectionRef, ...props }) => {
  return (
    <div>
      <button
        type="button"
        aria-expanded={!isActive ? "false" : "true"}
        aria-controls={`section${index}`}
        id={`${item.id}`}
        className={styles.accordionBtn}
        onClick={(e) => handleHeaderClick(e)}
        data-index={index}
        ref={sectionRef}
        {...props}
      >
        <span>{item.heading}</span>
        <span><FaChevronDown className={!isActive ? `${styles.icon} ${styles.unrotatedIcon}` : `${styles.icon} ${styles.rotatedIcon}`} /></span>
      </button>
      <div
        id={`section${index}`}
        role="region"
        aria-labelledby={`${item.id}`}
        className={!isActive ? `${styles.accordionPanel} ${styles.hidden}` : styles.accordionPanel}
      >{item.content}</div>
    </div>
  );
};

AccordionSection.propTypes = {
  item: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
  sectionRef: PropTypes.any.isRequired
}