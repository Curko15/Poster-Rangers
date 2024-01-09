import React, { useEffect, useState } from "react";
import { PosterData } from "../services/DataService";
import axios from "axios";
import {
  getAuthToken,
  getConferenceData,
  getLoggedInUser,
} from "../services/AuthService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const VotePosterDisplay = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const { posters, isLoading } = PosterData();
  const email = getLoggedInUser().userEmail;
  const conference = JSON.parse(getConferenceData());
  const end = conference.endTime;

  useEffect(() => {
    const today = new Date();
    if (end && today < end) setIsBtnDisabled(true);
  }, [end]);

  const handleSubmit = async (posterId) => {
    const formData = new FormData();
    formData.append("posterId", posterId);
    formData.append("konfId", conference.konfid);
    formData.append("email", email);

    try {
      const response = await axios.post(`/api/glasanje/addGlas`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getAuthToken().token,
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
          {posters.map((poster, index) => (
            <div className="posterVote">
              <img
                className="poster"
                src={`data:image/${poster.imageType};base64,${poster.imagebyte}`}
                alt={`poster-${index}`}
              />
              <div className="vote">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isBtnDisabled}
                  onClick={() => handleSubmit(poster.posterId)}
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
