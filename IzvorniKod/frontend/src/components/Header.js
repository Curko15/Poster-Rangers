import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import Options from "./Options";

const Header = () => {
  const navigate = useNavigate();
  const handleVideoClick = () => {
    navigate("/live");
  };
  const handleKonfClick = () => {
    navigate("/");
  };
  const handleFotoClick = () => {
    navigate("/foto");
  };
  const handlePromoClick = () => {
    navigate("/promo");
  };

  return (
    <header className="headerTrack">
      <nav>
        <div className="navList">
          <button id="konfButton" onClick={handleKonfClick}>
            Konferencija
          </button>
          <button id="videoButton" onClick={handleVideoClick}>
            Video Prijenos
          </button>
          <Options />
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
