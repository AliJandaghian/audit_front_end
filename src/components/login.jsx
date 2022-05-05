import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { email: "", password: "", departmentId: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
        {this.renderInput("email", "Email", "email", "Email address")}
        {this.renderInput(
          "password",
          "Password",
          "password",
          "Password",
          "off"
        )}

        {this.renderButton("Sing in", "button__purple")}
        <p>
          Don't have account ?&nbsp;
          <a className="link" href="">
             Register Here
          </a>
        </p>
      </form>
    );
  }
}

export default Login;
