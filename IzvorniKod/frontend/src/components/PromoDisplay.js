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
          <h2>Trenutno nema promotivnog materijala za prikaz!</h2>
        </div>
      ) : (
        <div className="postersContainer">
          {promo.map((promo, index) => (
            <div key={index} className="posterItem">
              <a href={promo.url}>
                <img
                  className="posterImage"
                  src={`data:image/${promo.promoType};base64,${promo.promobyte}`}
                  alt={`promo-${index}`}
                />
              </a>
              <div className="details">
                <h3 className="title">Tvrtka: {promo.nazivPromo}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoDisplay;
