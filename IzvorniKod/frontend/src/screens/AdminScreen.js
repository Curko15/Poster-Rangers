import React from "react";
import Header from ".././components/Header.js";
import AddConference from "../components/AddConference.js";

import "../css/main.css";

const AdminScreen = () => {
  return (
    <div className="root-container">
      <Header viewType="admin" />
      <div className="title">
        <h1>Dobrodošao administratore!</h1>
      </div>
      <AddConference />
    </div>
  );
};

export default AdminScreen;
