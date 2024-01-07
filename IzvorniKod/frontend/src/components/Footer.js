import React from "react";
import Map from "./Map";
import WeatherDisplay from "./WeatherDisplay";

import "../css/footer.css";
import "../css/main.css";

const Footer = () => {
  //const placeName = useState("Lokacija");
  const date = new Date().toLocaleDateString();

  return (
    <footer className="footerTrack">
      <div className="mapAndWeather">
        <p className="date">{date}</p>
        <div className="map">
          <Map />
        </div>
        <div className="weatherDisplay">
          <WeatherDisplay />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
