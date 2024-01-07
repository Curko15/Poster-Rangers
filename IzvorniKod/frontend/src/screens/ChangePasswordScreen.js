import Header from "../components/Header";
import ChangePassword from "../components/ChangePassword";
import Footer from "../components/Footer";
import React from "react";

const ChangePasswordScreen = () => {
  return (
    <div>
      <Header viewType="ChangePassword" />
      <h1 className="title">Promijeni lozinku</h1>
      <ChangePassword />
      <Footer />
    </div>
  );
};

export default ChangePasswordScreen;
