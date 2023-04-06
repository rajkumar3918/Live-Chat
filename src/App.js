import React from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/loginPage";
import Home from "./pages/homePage";
import Register from "./pages/registerPage";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>

      </Routes>
    </div>
  );
}

export default App;
