import React from "react";
import {Dropdown} from 'react-bootstrap'


const DropDown = ({ name, value, items, devider,variant,onItemClick,icon,form,className, ...rest}) => {
  return (
 
    <Dropdown 
    className={className}
    align="end"
    id="dropdown-menu-align-right"
    {...rest}

    >
        
  <Dropdown.Toggle variant={variant} id="dropdown-basic">
  {icon}{` ${name} `}
  </Dropdown.Toggle>

  <Dropdown.Menu className="dropdown-menu-right nav-dropDown" >

      {items.map(item=> <Dropdown.Item className="dropDown__items" onClick={onItemClick} key={item.value+item.path} name={item.value}>{item.label}</Dropdown.Item>)}
    <Dropdown.Divider/>
    {devider && 
    devider.map(itm=> <Dropdown.Item  key={itm.value} value={itm.value}>{itm.label}</Dropdown.Item>)}
    {form}
  </Dropdown.Menu>
  
</Dropdown>

  );
};

export default DropDown;
