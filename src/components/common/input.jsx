import React from "react";
const Input = ({ error, ...rest }) => {
  return (
    <div className="form-group">
      <input {...rest} />
      {error && <label className="error-label">{error}</label>}
    </div>
  );
};

export default Input;
