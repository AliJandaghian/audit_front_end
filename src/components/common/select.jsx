import React from "react";

const Select = ({options,error,value,label,...rest})=>{
   return( <div className="form-group">
        <select {...rest} defaultValue={'DEFAULT'}> 
          <option value="DEFAULT"  disabled >{label}</option>
          {options.map(o=><option key={o._id} value={o._id}>{o.name}</option>)}
        </select>
        {error && <label className="error-label">{error}</label>}
      </div>
   )}

export default Select 