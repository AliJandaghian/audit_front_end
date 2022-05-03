import React, { Component } from 'react';
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Redirect, Routes } from "react-router-dom";
import Audits from "./components/audits";
import Login from './components/login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
  return (
    <React.Fragment>
       <ToastContainer />
      <NavBar />
      <Login />
      
    </React.Fragment>
  );
  }
}

export default App;
