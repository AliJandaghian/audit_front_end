import React, { Component } from "react";

class Settings extends Component {
  state = {};
  render() {
    return (
      <div className="setting-page">
        <header className="setting-page__header">Settings</header>
        <div className="grid grid__2x3">
          {this.props.user?.isManager && (
            <button className="button button__purple card-box" onClick={()=>window.location = '/defects'}>
              <div className="card-box__header">Defects</div>
              <div className="card-box__body">Manage All defects</div>
            </button>
          )}
          {this.props.user?.isManager && (
            <button className="button button__purple card-box" onClick={()=>window.location = '/machines'}>
              <div className="card-box__header">Machines</div>
              <div>Manage list of machines</div>
            </button>
          )}
          {this.props.user?.isAdmin && (
            <button className="button button__purple card-box" onClick={()=>window.location = '/departments'}>
              <div className="card-box__header">Departments</div>
              <div>Manage list of departments</div>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Settings;
