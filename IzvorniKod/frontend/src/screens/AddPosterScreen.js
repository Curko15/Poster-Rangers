import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import "../css/main.css";
import AddConferenceComponent from "../components/AddConferenceComponent.js";
import AddAdminPoster from "../components/AddAdminPoster";

const AdminScreen = () => {
  return (
    <div>
      <Header viewType="admin" />
      <h1>Dobrodošao administratore!</h1>
      <AddAdminPoster />
      <Footer />
    </div>
  );
};

export default AdminScreen;
