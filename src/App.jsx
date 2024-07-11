import React from "react";
import Home from "../pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        
      </Routes>
    </Router>
  );
};

export default App;
