import React from "react";
import Register from "./components/RegistrationProcess/Register";
import Login from "./components/RegistrationProcess/Login";
import ForgotPass from "./components/RegistrationProcess/ForgotPass";
import { Routes, Route } from "react-router-dom";
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-pass" element={<ForgotPass />} />
      </Routes>
    </div>
  );
};

export default Router;
