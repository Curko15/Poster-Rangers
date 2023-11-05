import React, { useEffect, useState } from "react";
import "../css/footer.css";

const Footer = () => {
  //const [latitude, setLatitude] = useState(0);
  //const [longitude, setLongitude] = useState(0);
  const placeName = useState("New York City"); //it should be empty string, setPlaceName is for setting name from DB
  const date = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q60";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "4b7a7a808fmshd0408d91b0b5aa9p14ee69jsn7e074e923a32",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
    fetch(`${GEO_API_URL}/cities?namePrefix=${placeName}`, options)
      .then((response) => response.json())
      .then((response) => {
        const data = response.data;
        //setLongitude(data.longitude);
        //setLatitude(data.latitude);
        console.log(data);
      });
  }, [placeName]);

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
