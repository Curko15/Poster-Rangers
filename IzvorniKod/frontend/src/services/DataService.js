import { useEffect, useState } from "react";
import axios from "axios";
import {
  getAuthToken,
  getConferenceData,
  getLoggedInUser,
} from "./AuthService";

export const KonfKorisnikData = (setConferences, setIsLoading) => {
  useEffect(() => {
    const fetchConferences = async () => {
      const params = {
        email: getLoggedInUser().userEmail,
      };
      try {
        const response = await axios.post(
          "/api/konferencija/getKorisnikKonf",
          params,
          {
            headers: {
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (response.status === 200) {
          setConferences(response.data);
        } else {
          console.error("Error fetching conferences:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConferences();
  }, [setConferences, setIsLoading]);
};

export const PosterData = () => {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const posterResponse = await axios.get(
          `/api/poster/getAll/${getConferenceData().konfid}`,
        );

        if (posterResponse.status === 200) {
          const posterData = posterResponse.data;
          setPosters(posterData);
        } else {
          console.error("Error fetching posters:", posterResponse.statusText);
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
    const fetchPromos = async () => {
      try {
        const promoResponse = await axios.get(
          `/api/promomaterijal/getAll/${getConferenceData().konfid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (promoResponse.status === 200) {
          const posterData = promoResponse.data;
          setPromo(posterData);
        } else {
          console.error("Error fetching posters:", promoResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromos();
  }, []);

  return { promo, isLoading };
};

export const GalleryData = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoResponse = await axios.get(
          `/api/fotomaterijal/getAll/${getConferenceData().konfid}`,
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

export const RankData = () => {
  const [rank, setRank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await axios.get(
          `/api/glasanje/poredak?konferencijaId=${getConferenceData().konfid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (response.status === 200) {
          const rankData = Object.entries(response.data).map(([id, count]) => ({
            id: parseInt(id, 10),
            count,
          }));
          setRank(rankData);
        } else {
          console.error("Error fetching rank data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRank();
  }, []);

  return { rank, isLoading };
};

export const LocationData = () => {
  const [locationData, setlocationData] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResponse = await axios.get(
          `/api/konferencija/getLocation/${getConferenceData().konfid}`,
        );

        if (locationResponse.status === 200) {
          const locationResponseData = locationResponse.data;
          setlocationData(locationResponseData);
        } else {
          console.error(
            "Error fetching location name:",
            locationResponse.statusText,
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLocation();
  }, []);

  return { locationData };
};

export async function fetchRole() {
  const roleData = {
    email: getLoggedInUser().userEmail,
    password: getLoggedInUser().userPass,
  };
  return await axios.post("/api/korisnici/getRole", roleData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken().token,
    },
  });
}

export async function fetchCoordinates(placeName) {
  let apiKey = "41dfdc986e957806fd8639e81870f7dd";
  try {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=5&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    return await response.json();
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
}
