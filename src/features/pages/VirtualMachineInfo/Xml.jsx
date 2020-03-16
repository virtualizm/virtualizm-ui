import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export const Xml = ({ xml }) => {
  return <p className={styles.xml}>{xml}</p>;
};

Xml.propTypes = {
  xml: PropTypes.string.isRequired,
};
