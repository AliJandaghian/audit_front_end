import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="label">{label}</label>
      <input id={name} name={name} {...rest} />
      {error && <label className="error-label">{error}</label>}
    </div>
  );
};

export default Input;
