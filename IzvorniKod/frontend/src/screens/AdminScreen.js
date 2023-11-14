import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import "../css/main.css";
import AddConferenceComponent from "../components/AddConferenceComponent.js";

const AdminScreen = () => {
  return (
    <div>
      <Header viewType="Admin" />
      <h1>Dobrodošao administratore!</h1>
      <AddConferenceComponent />
      <Footer />
    </div>
  );
};

export default AdminScreen;
