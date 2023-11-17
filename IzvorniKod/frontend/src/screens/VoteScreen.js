import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import VotePosterDisplay from "../components/VotePosterDisplay";

import "../css/main.css";

const VoteScreen = () => {
  return (
    <div>
      <Header viewType="vote" />
      <div className="title">
        <h1>Glasaj za omiljeni poster!</h1>
        <h2>Odaberi jedan od ponuđenih postera i glasaj za njega!</h2>
      </div>
      <VotePosterDisplay />
      <Footer />
    </div>
  );
};

export default VoteScreen;
