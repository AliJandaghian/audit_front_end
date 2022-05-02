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
    return (
      <div className="nav">
        <a className="nav__brand link " href="/">
          Auditing App
        </a>

        <button onClick={this.handleExpandButton} className="nav__toggler">
          {this.state.navStatus && <i class="fas fa-times"></i> ||<i className="fas fa-bars"></i> }
        </button>
        <ul className={`list nav__list ${this.state.navStatus}`}>
          <li className="nav__item">
            <a className="link" href="/">
              Design new Audit
            </a>
          </li>
          <li className="nav__item">
            <a className="link" href="/">
              Setting
            </a>
          </li>
          <li className="nav__item">
            <a className="link" href="/">
              Log Out
            </a>
          </li>
          <li className="nav__item">
            <button className="link user_icon">UN</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
