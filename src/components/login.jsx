import React, { Component } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    loginForm: {},
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.loginForm, this.schema, options);
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
    toast(errors);
    if (errors) return console.log(errors);
    this.doSubmit();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    let loginForm = { ...this.state.loginForm };
    loginForm[name] = value;
    this.setState({ loginForm, errors });
  };

  validateForm = (event) => {
    event.preventDefault();
    this.validateProperty(event);
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.loginForm);
      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
    
      if (ex.response && ex.response.status === 400) {
          console.log(ex)
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form login-form">
        <h3 className="form__header">Please Sign in</h3>
        <div className="form-group">
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            placeholder="Email address"
          />
          <label >{this.state.errors.email}</label>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
          <label>{this.state.errors.password}</label>
        </div>
        <button className="button button__purple" type="submit">
          Sign in
        </button>
        <p>
          Don't have account ?  

          <a className="link" href="">
             Register Here
          </a>
        </p>
      </form>
    );
  }
}

export default Login;
