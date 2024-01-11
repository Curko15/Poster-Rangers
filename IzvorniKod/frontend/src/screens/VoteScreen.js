import React, { useEffect, useState } from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import VotePosterDisplay from "../components/VotePosterDisplay";
import { getConferenceData } from "../services/AuthService";

import "../css/main.css";
import RankDisplay from "../components/RankDisplay";

const VoteScreen = () => {
  const [hasEnded, setHasEnded] = useState(true);

  const conference = getConferenceData();
  const active = conference.aktivna;

  useEffect(() => {
    const end = new Date(conference.endTime);
    const today = new Date();
    if (end && today < end && !active) setHasEnded(true);
  }, [active, conference.endTime]);

  return (
    <div>
      <Header viewType="vote" />
      <div></div>
      {hasEnded ? (
        <>
          <h1 className="title">
            Pogledaj kako su se rangirali prijavljeni posteri!
          </h1>
          <RankDisplay />
        </>
      ) : (
        <>
          <h1 className="title">Glasaj za omiljeni poster!</h1>
          <h2>Odaberi jedan od ponuđenih postera i glasaj za njega!</h2>
          <VotePosterDisplay />
        </>
      )}
      <Footer />
    </div>
  );
};

export default VoteScreen;
