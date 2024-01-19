import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import ResetPassword from "../components/ResetPassword";

import "../css/main.css";

const ResetPasswordScreen = () => {
  return (
    <div className="root-container">
      <Header viewType="ResetPasswordScreen" />
      <ResetPassword />
      <Footer />
    </div>
  );
};

export default ResetPasswordScreen;
