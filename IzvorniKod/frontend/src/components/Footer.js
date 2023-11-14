import React, { useState } from "react";
import "../css/footer.css";

const Footer = () => {
  const placeName = useState("New York City"); //it should be empty string, setPlaceName is for setting name from DB
  const date = new Date().toLocaleDateString();

  return (
    <footer className="footerTrack">
      <div className="dateAndLocation">
        <p className="date">{date}</p>
        <p className="location">{placeName}</p>
      </div>
      <div className="weather">
        <div className="fix">Here should go component WeatherDisplay</div>
      </div>
    </footer>
  );
};

export default Footer;
