import React, { useEffect, useState } from "react";
import { PosterData } from "../services/DataService";
import axios from "axios";
import {
  getAuthToken,
  getConferenceData,
  getLoggedInUser,
  getVote,
  removeVote,
  setVote,
} from "../services/AuthService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";

const VotePosterDisplay = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [votedPoster, setVotedPoster] = useState(getVote());

  const { posters, isLoading } = PosterData();
  const email = getLoggedInUser().userEmail;
  const conference = getConferenceData();
  const end = new Date(conference.endTime);

  useEffect(() => {
    const today = new Date();
    if (end && today < end) setIsBtnDisabled(true);
  }, [end]);

  const hasVoted = (posterId) => +votedPoster === posterId;

  const handleSubmit = async (posterId) => {
    if (hasVoted(posterId)) {
      try {
        const response = await axios.delete("/api/glasanje/removeGlas", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
          params: {
            email: email,
            konferencijaId: conference.konfid,
          },
        });

        if (response.status === 200) {
          console.log("Vote removed");
          setVotedPoster("");
          removeVote();
        } else {
          console.error("Error removing vote:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      const formData = {
        posterId: posterId,
        konfId: conference.konfid,
        email: email,
      };

      try {
        const response = await axios.post(`/api/glasanje/addGlas`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
        });

        if (response.status === 200) {
          console.log("Vote given");
          setVotedPoster(posterId);
          setVote(posterId);
        } else {
          console.error("Error voting:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="posterDisplay">
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : posters.length === 0 ? (
        <div className="noPosters">
          <h2>Konferencija nema postere za koje možete glasati!</h2>
        </div>
      ) : (
        <div className="postersContainer">
          {posters.map((poster, index) => (
            <div key={index} className="posterItem">
              <img
                className="posterImage"
                src={`data:image/${poster.imageType};base64,${poster.imagebyte}`}
                alt={`poster-${index}`}
              />
              <div className="vote">
                  <button
                    type="submit"
                    className={`submit-button-${
                      isBtnDisabled ? "disabled" : "active"
                    }`}
                    disabled={isBtnDisabled}
                    onClick={() => handleSubmit(poster.posterId)}
                  >
                    {hasVoted(poster.posterId) ? "Izbriši glas" : "Glasaj"}
                  </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotePosterDisplay;
