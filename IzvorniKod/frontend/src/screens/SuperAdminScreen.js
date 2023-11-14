import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import "../css/main.css";
import AddAdmin from "../components/AddAdmin.js";
import AddConferenceComponent from "../components/AddConferenceComponent.js";

const SuperAdminScreen = () => {
  return (
    <div>
      <Header viewType="superAdmin" />
      <h1>Dobrodošao superadministratore!</h1>
      <AddAdmin />
      <AddConferenceComponent />
      <Footer />
    </div>
  );
};

export default SuperAdminScreen;
