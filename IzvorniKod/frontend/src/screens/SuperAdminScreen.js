import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import AddAdmin from "../components/AddAdmin.js";

import "../css/main.css";

const SuperAdminScreen = () => {
  return (
    <div className="root-container">
      <Header viewType="superAdmin" />
      <h1 className="title">Dobrodošao superadministratore!</h1>
      <AddAdmin />
      <Footer />
    </div>
  );
};

export default SuperAdminScreen;
