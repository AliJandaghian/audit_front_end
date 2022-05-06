import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import auth from "../services/authService";
import { getDepartments } from "../services/departmentService";

class SignUp extends Form {
  state = {
    data: { name: "", email: "", departmentId: "", password: "" },
    errors: {},
    departments: [],
  };

  schema = {
    name: Joi.string().min(1).required().label("Name"),
    email: Joi.string().email().trim().required().label("Email"),
    departmentId: Joi.string().required().label("Department"),
    password: Joi.string().min(6).required().label('Password'),
  }

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const name = ex.response.data.split(" ")[0].replace(/['"]+/g, "");
        if (name in this.state.data) {errors[name]=ex.response.data;}
        else errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  async componentDidMount() {
    const { data: departments } = await getDepartments();
    this.setState({ departments });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form sign-up-form">
        <h2 className="form__header">Please Sign Up</h2>
        {this.renderInput("name", "Name","text","Your full name")}
        {this.renderSelect(
          "departmentId",
          "Department",
          this.state.departments
        )}
        {this.renderInput("email", "Email", "email", "Email address")}
        {this.renderInput("password", "Password", "password","Create Password", "off")}
         <button className="button button__purple" type="submit">
          Sign up
        </button>
        <p>
          Already have account ?&nbsp;
          <a className="link" href="/login">
            Login Here
          </a>
        </p>
      </form>
    );
  }
}

export default SignUp;
