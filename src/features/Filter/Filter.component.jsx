import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import styles from "./styles.module.scss";

export const FilterComponent = ({ value, handleOnChange }) => {
  return (
    <div className={styles.filter}>
      <Input value={value} onChange={handleOnChange} placeholder="Filter..." />
    </div>
  );
};

FilterComponent.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};
