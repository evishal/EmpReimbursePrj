import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./component/Login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./component/Login/Register";


function App() {
  return (
    <div className="App">
      <h3>Application started</h3>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
