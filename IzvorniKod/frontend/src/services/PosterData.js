import { useEffect, useState } from "react";
import axios from "axios";
import { getConferenceId } from "./AuthService";

const PosterData = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const conferenceId = getConferenceId();
        const response = await axios.post(
          "/api/konferencija/getKonfId",
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
          const posterResponse = await axios.get(
            `/api/poster/getAll/${conferenceData}`,
          );

          if (posterResponse.status === 200) {
            const posterData = posterResponse.data;
            setPosters(posterData);
          } else {
            console.error("Error fetching posters:", posterResponse.statusText);
          }
        } else {
          console.error("Error fetching conference data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosters();
  }, []);

  return posters;
};

export default PosterData;
