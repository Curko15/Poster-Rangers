import React, { useEffect, useState } from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import VotePosterDisplay from "../components/VotePosterDisplay";
import { getConferenceData } from "../services/AuthService";
import RankDisplay from "../components/RankDisplay";

import "../css/main.css";

const VoteScreen = () => {
  const [hasEnded, setHasEnded] = useState(false);

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
      {hasEnded ? (
        <div className={"rankDisplay"}>
          <h1 className="title">
            Pogledaj kako su se rangirali prijavljeni posteri!
          </h1>
          <RankDisplay />
        </div>
      ) : (
        <div className={"voteDisplay"}>
          <h1 className="title">Glasaj za omiljeni poster!</h1>
          <h2>Odaberi jedan od ponuđenih postera i glasaj za njega!</h2>
          <VotePosterDisplay />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default VoteScreen;
