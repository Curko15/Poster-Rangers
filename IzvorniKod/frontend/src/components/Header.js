import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import {
  getLoggedInUser,
  isUserLoggedIn,
  userLogOut,
} from "../services/AuthService";

const Header = ({ viewType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let user = getLoggedInUser();
    const fetchData = async () => {
      if (isUserLoggedIn()) {
        try {
          const response = await fetch(
            "http://localhost:8081/korisnici/getRole",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.userEmail,
                password: user.userPass,
              }),
            },
          );

          const userRole = await response.json(); //TODO: here is the role
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleVideoClick = () => {
    navigate("/live");
  };

  const handleKonfClick = () => {
    navigate("/home");
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

  const handleBackClick = () => {
    navigate("/");
  };

  const renderButtons = () => {
    return (
      <>
        {(viewType === "login" || viewType === "register") && (
          <button id="backButton" onClick={handleBackClick}>
            Return
          </button>
        )}
        {(viewType === "entercode" || viewType === "homescreen") &&
          !isUserLoggedIn() && (
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
        {isUserLoggedIn() &&
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
        {isUserLoggedIn() &&
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
        {isUserLoggedIn() &&
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
        {isUserLoggedIn() &&
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
