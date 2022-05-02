import React, { Component } from 'react';
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Redirect, Routes } from "react-router-dom";
import Audits from "./components/audits";


class App extends Component {
  render() {
  return (
    <React.Fragment>
      <NavBar />
      <Audits />
    </React.Fragment>
  );
  }
}

export default App;
