import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import AddPoster from "../components/AddPoster";

import "../css/main.css";

const AdminScreen = () => {
  return (
    <div>
      <Header viewType="admin" />
      <div className="title">
        <h1>Dodavanje novih postera</h1>
      </div>
      <AddPoster />
      <Footer />
    </div>
  );
};

export default AdminScreen;
