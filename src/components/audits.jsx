import React, { Component } from "react";

class Audits extends Component {
  state = {
      sideBarStatus:"side-bar__hide"
    };
  render() {
      const {sideBarStatus} = this.state
    return (
      <div class="layout">
        <div class="side-bar">
          <button
            onClick={() => this.setState({ sideBarStatus: "side-bar__open" })}
            class="side-bar__toggler"
          >
            <i class="fas fa-chart-bar"></i>
          </button>
          <div class={`side-bar__panel ${sideBarStatus}`}>
            <div class="side-bar__header">
              Header
              <button
                onClick={() =>
                  this.setState({ sideBarStatus: "side-bar__hide" })
                }
                className="side-bar__close"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="side-bar__body">Body</div>
          </div>
        </div>
        <div class="work-area">
          <button class="button button__green">Audit Form</button>
        </div>
      </div>
    );
  }
}

export default Audits;
