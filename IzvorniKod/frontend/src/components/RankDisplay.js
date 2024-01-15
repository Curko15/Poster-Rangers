import React from "react";
import { PosterData, RankData } from "../services/DataService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const RankDisplay = () => {
  const { rank, isLoading } = RankData();
  const { posters, isLoading: postersLoading } = PosterData();

  const getPosterById = (posterId) => {
    return posters.find((poster) => poster.posterId === posterId);
  };

  return (
    <>
      {isLoading || postersLoading ? (
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
              <th>Broj glasova</th>
            </tr>
          </thead>
          <tbody>
            {rank.map(({ id, count }, index) => {
              const poster = getPosterById(id);

              return poster ? (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{poster.nazivPoster}</td>
                  <td>{poster.imeAutor}</td>
                  <td>{poster.prezimeAutor}</td>
                  <td>{count}</td>
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RankDisplay;
