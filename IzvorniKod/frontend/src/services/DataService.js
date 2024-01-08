import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken, getConferenceId } from "./AuthService";

export const postRequest = async (route, params) => {
  try {
    return await axios.post(`/api/${route}`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken().token,
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const PosterData = () => {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosters();
  }, []);

  return { posters, isLoading };
};

export const PromoData = () => {
  const [promo, setPromo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(response.data);
        if (response.status === 200) {
          const conferenceData = response.data;
          const posterResponse = await axios.get(
            `/api/promomaterijal/getAll/${conferenceData}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAuthToken().token,
              },
            },
          );

          if (posterResponse.status === 200) {
            const posterData = posterResponse.data;
            console.log(posterData);
            setPromo(posterData);
          } else {
            console.error("Error fetching posters:", posterResponse.statusText);
          }
        } else {
          console.error("Error fetching conference data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosters();
  }, []);

  return { promo, isLoading };
};

export const GalleryData = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
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
        console.log(response.data);
        if (response.status === 200) {
          const conferenceData = response.data;
          const photoResponse = await axios.get(
            `/api/fotomaterijal/getAll/${conferenceData}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAuthToken().token,
              },
            },
          );

          if (photoResponse.status === 200) {
            const photoData = photoResponse.data;
            console.log(photoData);
            setPhotos(photoData);
          } else {
            console.error("Error fetching photos:", photoResponse.statusText);
          }
        } else {
          console.error("Error fetching conference data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, isLoading };
};
