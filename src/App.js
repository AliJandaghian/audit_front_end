import React, { Component } from 'react';
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Redirect, Routes,BrowserRouter as Router } from "react-router-dom";

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
      <Routes>
      <Route  path="/login" element={<Login/>}/>
      <Route  path="/audits" element={<Audits/>}/>
      <Route exact path="/" element={<Audits/>}/>
      </Routes>
    </React.Fragment>
  );
  }
}

export default App;
