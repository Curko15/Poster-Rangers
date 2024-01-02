import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import ResetPassword from "../components/ResetPassword";

import "../css/main.css";

const ResetPasswordScreen = () => {
  return (
    <div className="root-container">
      <Header viewType="ResetPasswordScreen" />
      <h1 className="title">Reset Password</h1>
      <ResetPassword />
      <Footer />
    </div>
  );
};

export default ResetPasswordScreen;
