import React, { Component } from 'react';
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Redirect, Routes } from "react-router-dom";
import Audits from "./components/audits";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer />
      <Audits />
    </React.Fragment>
  );
  }
}

export default App;
