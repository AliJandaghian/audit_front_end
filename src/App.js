import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Navigate, Routes } from "react-router-dom";
import Audits from "./components/audits";
import Defects from "./components/defects";
import Machines from "./components/machines";
import NotFound from "./components/notFound";
import Departments from "./components/departments";
import WrappedLogin from "./components/wrappedLogin";
import Logout from "./components/logout";
import SignUp from "./components/signUp";
import Settings from "./components/settings";
import auth from "./services/authService";
import AuditSetting from "./components/auditSetting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chart,
  ArcElement,
  BarElement,
  BarController,
  LinearScale,
  CategoryScale,
  Decimation,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ProtectedRoute from "./components/common/protectedRoute";

Chart.register(
  ChartDataLabels,
  BarElement,
  ArcElement,
  BarController,
  LinearScale,
  CategoryScale,
  Decimation,
  Legend,
  Title,
  Tooltip
);

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer autoClose={1000} position="bottom-right" />
        <NavBar user={user} />
        <Routes>
          <Route
            path="/login"
            element={<WrappedLogin loggedIn={() => this.componentDidMount()} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/audits/:id" element={<Audits user={user} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/audits" element={<AuditSetting user={user} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/settings" element={<Settings user={user} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/defects" element={<Defects user={user} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/machines" element={<Machines user={user} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/departments" element={<Departments user={user} />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
          <Route exact path="/" element={<Navigate to="/audits" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
