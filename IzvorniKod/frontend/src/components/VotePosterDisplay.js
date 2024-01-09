import React, { useEffect, useState } from "react";
import { PosterData } from "../services/DataService";
import axios from "axios";
import {
  getConferenceData,
  getConferenceId,
  getLoggedInUser,
} from "../services/AuthService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const VotePosterDisplay = () => {
  const [selectedPoster, setSelectedPoster] = useState("");

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const { posters, isLoading } = PosterData();
  const email = getLoggedInUser().userEmail;
  const end = getConferenceData().endTime;

  useEffect(() => {
    const today = new Date();
    if (end && today < end) setIsBtnDisabled(true);
  }, [end]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("posterId", selectedPoster);
    formData.append("konfId", getConferenceId());
    formData.append("email", email);

    try {
      const response = await axios.post(`/api/glasanje/addGlas`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Vote given");
        setIsBtnDisabled(true);
      } else {
        console.error("Error voting:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : posters.length === 0 ? (
        <h2>Konferencija nema postere za koje možete glasati!</h2>
      ) : (
        <div className="posterDisplay">
          {posters.map((image, index) => (
            <div className="posterVote">
              <img
                className="poster"
                src={`data:image/${image.imageType};base64,${image.imagebyte}`}
                alt={`poster-${index}`}
              />
              <div className="vote">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isBtnDisabled}
                  onClick={handleSubmit}
                >
                  Glasaj
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VotePosterDisplay;
