import React from "react";
import Header from ".././components/Header.js";
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
    </div>
  );
};

export default AdminScreen;
