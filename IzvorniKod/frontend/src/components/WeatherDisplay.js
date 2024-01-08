import React, { useEffect, useState } from "react";
import ReactWeather, { useWeatherBit } from "react-open-weather";
import axios from "axios";
import { getConferenceId } from "../services/AuthService";
import "../css/main.css";
import "../css/weather.css";

const App = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [locationName, setLocationName] = useState("Split"); // Default location

  async function fetchCoordinates(locationName, apiKey) {
    apiKey = "41dfdc986e957806fd8639e81870f7dd"; // Replace with your actual API key
    try {
      const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      // Process the data received from the API
      return await response.json();
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error; // Propagate the error to handle it further if needed
    }
  }

  async function fetchLocationName(conferenceId) {
    try {
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
        const locationResponse = await axios.get(
          `/api/konferencija/getLocation/${conferenceData}`,
        );

        if (locationResponse.status === 200) {
          const locationData = locationResponse.data;
          setLocationName(locationData.nazivMjesta);
        } else {
          console.error(
            "Error fetching location name:",
            locationResponse.statusText,
          );
        }
      } else {
        console.error("Error fetching conference data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const conferenceId = getConferenceId(); // Replace with your logic to get conference ID
    fetchLocationName(conferenceId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coords = await fetchCoordinates(locationName);
        setCoordinates(coords[0]); // Assuming you want the first result as coordinates
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchData();
  }, [locationName]);

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: "7024cd5ab118458092bb1236a5a216c9",
    lat: coordinates?.lat || "48.137154",
    lon: coordinates?.lon || "11.576124",
    lang: "en",
    unit: "M", // values are (M,S,I)
  });

  return (
    <div className="weatherContainer">
      {isLoading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>Error: {errorMessage}</div>
      ) : (
        <ReactWeather
          className="weather"
          data={data}
          lang="en"
          locationLabel={coordinates ? locationName : "Munich"}
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
        />
      )}
    </div>
  );
};

export default App;
