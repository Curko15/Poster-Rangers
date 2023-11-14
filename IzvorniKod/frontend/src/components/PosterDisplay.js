import React, { useEffect, useState } from "react";
import "../css/posterDisplay.css";
import { getConferenceId } from "../services/AuthService";

const PosterDisplay = () => {
  const [images, setImages] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchPosters = async () => {
      const conferenceId = getConferenceId();
      try {
        // Replace this URL with your actual server endpoint
        const response = await fetch("getAll/1");
        console.log("getAll/" + conferenceId);

        const data = await response.json();

        setImages(data); // Assuming data is an array of poster URLs
      } catch (error) {
        console.error("Error fetching posters:", error);
      }
    };
    fetchPosters();
  }, []);

  return (
    <div className="posterDisplay">
      {images.map((image, index) => (
        <div key={index}>
          <img
            className="poster"
            style={{ display: !display ? "flex" : "none" }}
            src={image}
            alt={`poster-${index}`}
            onMouseEnter={() => setDisplay(true)}
            onMouseLeave={() => setDisplay(false)}
          />
          <div
            className="details"
            style={{ display: display ? "flex" : "none" }}
          >
            <h3 className="title">Title</h3>
            <h3 className="author">Author</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PosterDisplay;
