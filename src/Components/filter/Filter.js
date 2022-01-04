import React from "react";
import PropTypes from "prop-types";
import s from "./filter.module.css";

const Filter = ({ value, onChange }) => {
  return (
    <label>
      filter for name{" "}
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
