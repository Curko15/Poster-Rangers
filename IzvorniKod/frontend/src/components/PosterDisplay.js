import React, { useEffect, useState } from "react";
import { getAuthToken, getConferenceId } from "../services/AuthService";
import axios from "axios";

import "../css/posterDisplay.css";

const PosterDisplay = async () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getAll/${getConferenceId()}`, {
          headers: {
            Authorization: "Bearer " + getAuthToken().token,
          },
        });
        setImages(response.data);
      } catch (error) {
        console.error("Error:", error);
        setImages([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="posterDisplay">
      {images.length === 0 ? (
        <h1>Nema postera za prikazati!</h1>
      ) : (
        images.map((image, index) => (
          <div key={index}>
            <img className="poster" src={image} alt={`poster-${index}`} />
            <div className="details">
              <h3 className="title">Naziv</h3>
              <h3 className="author">Autor</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PosterDisplay;
