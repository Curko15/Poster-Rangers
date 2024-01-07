import React, { useEffect, useState } from "react";
import { PosterData } from "../services/DataService";
import axios from "axios";
import {
  getAuthToken,
  getConferenceId,
  getLoggedInUser,
} from "../services/AuthService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const VotePosterDisplay = () => {
  const [selectedPoster, setSelectedPoster] = useState("");
  const [conference, setConference] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const posters = PosterData();

  const email = getLoggedInUser().userEmail;

  useEffect(async () => {
    try {
      const conferenceId = getConferenceId();
      const response = await axios.post(
        "/api/konferencija/loginKonf",
        {
          password: conferenceId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const conferenceData = response.data;
        setConference(conferenceData.konfId);

        const endTime = conferenceData.endTime;
        const currentTime = new Date();
        if (endTime < currentTime) setIsDisabled(true);
      } else {
        console.error("Error fetching conference data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("posterId", selectedPoster);
    formData.append("konfId", conference);
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
        setIsDisabled(true);
      } else {
        console.error("Error fetching posters:", response.statusText);
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
              <img className="poster" src={image} alt={`poster-${index}`} />
              <div className="vote">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isDisabled}
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
