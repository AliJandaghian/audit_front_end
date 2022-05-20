import React from "react";
import Select from "react-select";

const MultiSelect = ({ name, label, options, error, value, ...rest }) => {
  const customStyle = {
    control: (provided) => ({
      ...provided,
      border: 0,
      boxShadow: "none",
    }),
  };
  return (
    <div className="form-group">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <Select
        className="Select"
        options={options}
        isMulti
        styles={customStyle}
        {...rest}
        value={value}
        name={name}
      />
      {error && <div className="error-label">{error}</div>}
    </div>
  );
};

export default MultiSelect;
