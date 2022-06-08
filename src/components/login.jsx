import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
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
      const { navigate } = this.props;
      const targetPath = state ? state.from.pathname : "/";
      navigate(targetPath, { replace: true });
      this.props.loggedIn();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const name = ex.response.data.split(" ")[0].replace(/['"]+/g, "");
        if (name in this.state.data) {
          errors[name] = ex.response.data;
        } else errors.password = ex.response.data;
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
          <a className="link" href="signup">
            Register Here
          </a>
        </p>
      </form>
    );
  }
}

export default Login;
