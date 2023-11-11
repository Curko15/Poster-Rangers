import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";

import "../css/main.css";
import VotePosterDisplay from "../components/VotePosterDisplay";

const VoteScreen = () => {
  return (
    <div>
      <Header />
      <h1>Glasaj za omiljeni poster!</h1>
      <h2>Odaberi jedan od ponuđenih postera i glasaj za njega!</h2>
      <VotePosterDisplay />
      <Footer />
    </div>
  );
};

export default VoteScreen;
