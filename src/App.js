import React, { Component } from 'react';
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Redirect, Routes,BrowserRouter as Router } from "react-router-dom";
import Audits from "./components/audits";
import Login from './components/login';
import SignUp from './components/signUp';
import AuditSetting from './components/auditSetting';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Chart,ArcElement, BarElement, BarController,LinearScale, CategoryScale, Decimation, Legend, Title, Tooltip} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels,BarElement,ArcElement, BarController, LinearScale,CategoryScale, Decimation, Legend, Title, Tooltip);


class App extends Component {
  render() {
  return (
    <React.Fragment>
       <ToastContainer />
      <NavBar />
      <Routes>
      <Route  path="/login" element={<Login/>}/>
      <Route  path="/signup" element={<SignUp/>}/>
      <Route  path="/audits/:id" element={<Audits/>}/>
      <Route  path="/audits" element={<AuditSetting/>}/>
      <Route exact path="/" element={<AuditSetting/>}/>
      </Routes>
    </React.Fragment>
  );
  }
}

export default App;
