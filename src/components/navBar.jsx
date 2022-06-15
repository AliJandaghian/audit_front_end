import React, { Component } from "react";

class NavBar extends Component {
  state = {
    navStatus: "",
  };

  handleExpandButton = () => {
    let navStatus = this.state.navStatus === "" ? "expanded" : "";
    this.setState({ navStatus });
  };

  render() {
    const { user } = this.props;
    return (
      <div className="nav">
        <div className="nav_brand_container">
          <a className="nav__brand link " href="/">
            Auditing App
          </a>
          <span className="nav_department">{user?.department?.name}</span>
        </div>
        <button onClick={this.handleExpandButton} className="nav__toggler">
          {(this.state.navStatus && <i className="fas fa-times"></i>) || (
            <i className="fas fa-bars"></i>
          )}
        </button>
        <ul className={`list nav__list ${this.state.navStatus}`}>
          {user?.isManager && (
            <li className="nav__item">
              <a className="link" href="/">
                Design new Audit
              </a>
            </li>
          )}
          {user?.isManager && (
            <li className="nav__item">
              <a className="link" href="/settings">
                Setting
              </a>
            </li>
          )}
          {(user && (
            <li className="nav__item">
              <a className="link" href="/logout">
                Log Out
              </a>
            </li>
          )) || (
            <li className="nav__item">
              <a className="link" href="/signup">
                Sign up
              </a>
            </li>
          )}
          {user && <li className="nav__item user_icon">{user.name}</li>}
        </ul>
      </div>
    );
  }
}

export default NavBar;
