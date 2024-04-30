import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./component/Login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./component/Login/Register";
import { Reimburse } from "./component/Reimbursement/Reimburse";
import { UserInterface } from "./Interfaces/UserInterface";



function App() {

 

  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/emp" element={<Reimburse></Reimburse>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
