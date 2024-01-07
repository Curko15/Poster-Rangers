import React from "react";
import { PosterData } from "../services/DataService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const PosterDisplay = () => {
  const { posters, isLoading } = PosterData();

  return (
    <div className="posterDisplay">
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : posters.length === 0 ? (
        <h1>Nema postera za prikazati!</h1>
      ) : (
        posters.map((poster, index) => (
          <div key={index}>
            <img
              className="poster"
              src={`data:image/${poster.imageType};base64,${poster.imagebyte}`}
              alt={`poster-${index}`}
            />
            <div className="details">
              <h3 className="title">Naziv: {poster.nazivPoster}</h3>
              <h3 className="author">
                Autor: {`${poster.imeAutor} ${poster.prezimeAutor}`}
              </h3>
              <h3 className="email">Email autora: {poster.emailAutor}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PosterDisplay;
