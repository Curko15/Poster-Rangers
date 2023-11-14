import React from "react";
import Header from ".././components/Header.js";
import EnterCodeComponent from "../components/EnterCodeComponent";
import "../css/main.css";

const EnterCodeScreen = () => {
  return (
    <div>
      <Header viewType="entercode" />
      <EnterCodeComponent />
    </div>
  );
};

export default EnterCodeScreen;
