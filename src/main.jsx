import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate, Route, Routes
} from "react-router-dom";

import "./App.css";

import LoginForm from "./LoginForm.jsx";
import Notes from "./Notes.jsx";

class Logout extends React.Component {
  render() {
    localStorage.removeItem("Authorization");
    return <Navigate to="/login" replace={true}/>;
  }
}

class Root extends React.Component {
  render() {
    let Authorization = localStorage.getItem("Authorization");
    if (!Authorization) {
      return <Navigate to="/login" replace={true}/>;
    } else {
      return <Navigate to="/notes" replace={true}/>;
    }
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/notes" element={<Notes/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
