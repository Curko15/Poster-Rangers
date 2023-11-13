import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import {getLoggedInUser, isUserLoggedIn, saveLoggedInUser, userLogOut} from "../services/AuthService";

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
        //This for login
    };

    const handleRegisterClick = () => {
        navigate("/register");
        //This for register
    };

    const handleAddConferenceClick = () => {
        navigate("/dodajKonf");
        //This for register
    };

    const handleLogOutClick = () => {
        userLogOut();
        navigate("/");
    };

  const renderButtons = () => {
    if (viewType === "login") {
      return (
          <>
            <button id="loginButton" onClick={handleLoginClick}>Login</button>
            <button id="registerButton" onClick={handleRegisterClick}>Register</button>
            <button id="logOutButton" onClick={handleLogOutClick}>Log Out</button>
            <button id="addConferenceId" onClick={handleAddConferenceClick}>Add Conference</button>
          </>
      );
    } else if (viewType === "register") {
      return (
          <>
            <button id="konfButton" onClick={handleKonfClick}>
              Konferencija
            </button>
            <button id="videoButton" onClick={handleVideoClick}>
              Video Prijenos
            </button>
            <button id="fotoButton" onClick={handleFotoClick}>
              Fotografije
            </button>
            <button id="promoButton" onClick={handlePromoClick}>
              Promocije
            </button>
          </>
      );
    }
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
