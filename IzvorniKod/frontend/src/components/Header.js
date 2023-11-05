import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
import "../css/header.css";

const Header = () => {
  const navigate = useNavigate();
  const handleVideoClick = () => {
    navigate("/live");
  };
  const handleKonfClick = () => {
    navigate("/");
  };
  const handlePosterClick = () => {
    navigate("/poster");
  };
  const handleFotoClick = () => {
    navigate("/foto");
  };
  const handlePromoClick = () => {
    navigate("/promo");
  };

  return (
    <header className="headerTrack">
      <img className="logo" src={logo} alt="Logo" />
      <nav>
        <div className="navList">
          <button id="konfButton" onClick={handleKonfClick}>
            Konferencija
          </button>
          <button id="videoButton" onClick={handleVideoClick}>
            Video Prijenos
          </button>
          <button id="posterButton" onClick={handlePosterClick}>
            Posteri
          </button>
          <button id="fotoButton" onClick={handleFotoClick}>
            Fotografije
          </button>
          <button id="promoButton" onClick={handlePromoClick}>
            Promocije
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
