import React, { useEffect, useState } from "react";
import "../css/posterDisplay.css";
import { getAuthToken, getConferenceId } from "../services/AuthService";
import axios from "axios";

const PosterDisplay = async () => {
  const [images, setImages] = useState([]);
  const [display, setDisplay] = useState(false);

  try {
    const response = await axios.get(
      `http://localhost:8081/api/getAll/${getConferenceId()}`,
      {
        headers: {
          Authorization: "Bearer " + getAuthToken().token,
        },
      },
    );
    setImages(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }

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
