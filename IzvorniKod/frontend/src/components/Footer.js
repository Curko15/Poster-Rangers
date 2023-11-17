import React, { useState } from "react";
import "../css/footer.css";

const Footer = () => {
  const placeName = useState("Lokacija");
  const date = new Date().toLocaleDateString();

  return (
    <footer className="footerTrack">
      <div className="dateAndLocation">
        <p className="date">{date}</p>
        <p className="location">{placeName}</p>
      </div>
      <div className="weather">
        <div className="fix">WeatherDisplay</div>
      </div>
    </footer>
  );
};

export default Footer;
