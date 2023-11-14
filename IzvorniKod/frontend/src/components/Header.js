import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import {
  getLoggedInUser,
  isUserLoggedIn,
  saveLoggedInUser,
  userLogOut,
} from "../services/AuthService";

const Header = ({ viewType }) => {
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

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogOutClick = () => {
    userLogOut();
    navigate("/");
  };
  const handleVoteClick = () => {
    navigate("/glasanje");
  };

  const renderButtons = () => {
    return (
      <>
        {viewType === "entercode" && !isUserLoggedIn() && (
          <button id="loginButton" onClick={handleLoginClick}>
            Login
          </button>
        )}
        {viewType === "entercode" && !isUserLoggedIn() && (
          <button id="registerButton" onClick={handleRegisterClick}>
            Register
          </button>
        )}
        {isUserLoggedIn() && (
          <button id="logOutButton" onClick={handleLogOutClick}>
            Log Out
          </button>
        )}

        {(viewType === "homescreen" ||
          viewType === "liveVideo" ||
          viewType === "photo" ||
          viewType === "poster" ||
          viewType === "promo") && (
          <button id="konfButton" onClick={handleKonfClick}>
            Konferencija
          </button>
        )}
        {isUserLoggedIn &&
          (viewType === "homescreen" ||
            viewType === "liveVideo" ||
            viewType === "photo" ||
            viewType === "poster" ||
            viewType === "promo" ||
            viewType === "vote") && (
            <button id="videoButton" onClick={handleVideoClick}>
              Video Prijenos
            </button>
          )}
        {isUserLoggedIn &&
          (viewType === "homescreen" ||
            viewType === "liveVideo" ||
            viewType === "photo" ||
            viewType === "poster" ||
            viewType === "promo" ||
            viewType === "vote") && (
            <button id="fotoButton" onClick={handleFotoClick}>
              Fotografije
            </button>
          )}
        {isUserLoggedIn &&
          (viewType === "homescreen" ||
            viewType === "liveVideo" ||
            viewType === "photo" ||
            viewType === "poster" ||
            viewType === "promo" ||
            viewType === "vote") && (
            <button id="promoButton" onClick={handlePromoClick}>
              Promocije
            </button>
          )}
        {isUserLoggedIn &&
          (viewType === "homescreen" ||
            viewType === "liveVideo" ||
            viewType === "photo" ||
            viewType === "poster" ||
            viewType === "promo" ||
            viewType === "vote") && (
            <button id="voteButton" onClick={handleVoteClick}>
              Glasaj
            </button>
          )}
      </>
    );
  };

  return (
    <header className="headerTrack">
      <nav>
        <div className="navList">{renderButtons()}</div>
      </nav>
    </header>
  );
};

export default Header;
