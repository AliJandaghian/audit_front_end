import React, { Component } from 'react';
import Joi from "joi-browser";
import Input from './input';
import Select from './select';
class Form extends Component {
    state = { 
        data:{},
        errors:{}
     } 

     validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;
        let errors = {};
        error.details.forEach((itm) => {
          errors[itm.path[0]] = itm.message;
        });
        return errors;
      };

      validateProperty = (event) => {
        const { name, value } = event.target;
        const obj = { [name]: value };
        const subSchema = { [name]: this.schema[name] };
        const result = Joi.validate(obj, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return console.log(errors);
        this.doSubmit();
      };
    
      handleChange = (event) => {
        const { name, value } = event.target;
        let errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(event);
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        let data = { ...this.state.data };
        data[name] = value;
        this.setState({ data: data, errors });
      };


    renderButton(label,color) { 
        return (<button className={`button ${color}`} type="submit">
       {label}
      </button>);
    }

    renderInput(name,label,type ="text",placeholder, autocomplete ="on") {
        const {data, errors} = this.state
        return (
            <Input
              onChange={this.handleChange}
              name={name}
              label={label}
              type={type}
              value={data[name]}
              placeholder={placeholder}
              error={errors[name]}
              autoComplete= {autocomplete}
            />
            
        )
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        return (
          <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
          />
        );
      }

}
 
export default Form;
