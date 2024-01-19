import React, { useEffect, useState } from "react";
import ReactWeather, { useWeatherBit } from "react-open-weather";
import { fetchCoordinates, LocationData } from "../services/DataService";

import "../css/main.css";
import "../css/weather.css";

const Weather = () => {
  const { locationData } = LocationData();
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coords = await fetchCoordinates(locationData.nazivMjesta);
        setCoordinates(coords[0]);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchData();
  }, [locationData.nazivMjesta]);

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: "7024cd5ab118458092bb1236a5a216c9",
    lat: coordinates?.lat || "48.137154",
    lon: coordinates?.lon || "11.576124",
    lang: "en",
    unit: "M",
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
          locationLabel={coordinates ? locationData.nazivMjesta : "Zagreb"}
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
        />
      )}
    </div>
  );
};

export default Weather;
