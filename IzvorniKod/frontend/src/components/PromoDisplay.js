import React from "react";
import { PromoData } from "../services/DataService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const PromoDisplay = () => {
  const { promo, isLoading } = PromoData();

  return (
    <div className="posterDisplay">
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : promo.length === 0 ? (
        <div className="noPosters">
          <h1>Trenutno nema promotivnog materijala za prikaz!</h1>
        </div>
      ) : (
        <div className="postersContainer">
          {promo.map((poster, index) => (
            <div key={index} className="posterItem">
              <img
                className="posterImage"
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
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoDisplay;
