import React from "react";
import Header from ".././components/Header.js";
import Authentication from "../components/Authentication";

import "../css/main.css";

const AuthenticationScreen = ({ viewType }) => {
  return (
    <div>
      <Header viewType="login" />
      <Authentication viewType={viewType} />
    </div>
  );
};

export default AuthenticationScreen;
