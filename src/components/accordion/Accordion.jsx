import React, {useState} from "react";
import PropTypes from 'prop-types';
import { FaChevronDown } from "react-icons/fa"
import styles from "./Accordion.module.css";

export const Accordion = ({ items }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const togglePanel = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded="true"
        aria-controls="section1"
        id="accordion1id"
        className={styles.accordionBtn}
        onClick={togglePanel}
      >
        <span>{items[0].heading}</span>
        <span><FaChevronDown /></span>
      </button>
      <div
        id="section1"
        role="region"
        aria-labelledby="accordion1id"
        className={isCollapsed ? `${styles.accordionPanel} ${styles.hidden}` : styles.accordionPanel}
      >{items[0].content}</div>
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      content: PropTypes.node
    })
  ).isRequired
}