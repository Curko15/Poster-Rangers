import React from "react";
import { RankData } from "../services/DataService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const RankDisplay = () => {
  const { rank, isLoading } = RankData();
  console.log(rank);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : rank.length === 0 ? (
        <h2>Konferencija nema postere u natjecanju!</h2>
      ) : (
        <table className="rankTable">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Naziv Postera</th>
              <th>Ime Autora</th>
              <th>Prezime Autora</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(rank).map(([poster, rank]) => (
              <tr key={poster.posterId}>
                <td>{rank}</td>
                <td>{poster.nazivPoster}</td>
                <td>{poster.imeAutor}</td>
                <td>{poster.prezimeAutor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RankDisplay;
