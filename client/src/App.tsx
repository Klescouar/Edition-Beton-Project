import React from "react";
import Home from "views/Home/Home";
import Login from "views/Login/Login";
// @ts-ignore
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
