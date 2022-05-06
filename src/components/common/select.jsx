import React from "react";

const Select = ({ name, label, value, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <select id={name} name={name} {...rest} defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>
          {label}
        </option>
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <label className="error-label">{error}</label>}
    </div>
  );
};

export default Select;
