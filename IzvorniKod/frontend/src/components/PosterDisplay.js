import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/posterDisplay.css";

const PosterDisplay = () => {
  //const backendURL = "http://localhost:8081/static/";
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/poster/getAll/21`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setImages(response.data);
        console.log(response.data);
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
            <img
              className="poster"
              src={encodeURIComponent(image.posterPath)}
              alt={`poster-${index}`}
            />
            <div className="details">
              <h3 className="title">Naziv: {image.nazivPoster}</h3>
              <h3 className="author">
                Autor: {`${image.imeAutor} ${image.prezimeAutor}`}
              </h3>
              <h3 className="email">Email autora: {image.emailAutor}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PosterDisplay;
