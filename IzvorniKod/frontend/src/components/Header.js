import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import {
  getLoggedInUser,
  isLoggedInConference,
  isUserLoggedIn,
  logOutFromConference,
  userLogOut,
} from "../services/AuthService";

const Header = ({ viewType }) => {
  const navigate = useNavigate();
  const [userRoleName, setUserRoleName] = useState("");

  useEffect(() => {
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
                email: getLoggedInUser().userEmail,
                password: getLoggedInUser().userPass,
              }),
            },
          );
          const userRole = await response.json();

          userRole.map((role) => setUserRoleName(role.name));
          console.log(userRoleName);
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
    setUserRoleName("");
    navigate("/");
  };

  const handleVoteClick = () => {
    navigate("/glasanje");
  };

  const handleBackClick = () => {
    if (isLoggedInConference()) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const handleExitClick = () => {
    logOutFromConference();
    navigate("/");
  };
  const handleDodajKonfClick = () => {
    navigate("/konferencija/addKonf");
  };
  const handleDodajPosterClick = () => {
    navigate("/dodajPoster");
  };

  const handleAddPosterClick = () => {
    navigate("/dodajPoster");
  };

  const handleAddConferenceClick = () => {
    navigate("/admin");
  };

  const handleAddAdminClick = () => {
    navigate("/superAdmin");
  };

  const renderButtons = () => {
    return (
      <>
        {userRoleName === "ROLE_ADMIN" && (
          <button id="addPosterButton" onClick={handleAddPosterClick}>
            Dodaj poster
          </button>
        )}
        {userRoleName === "ROLE_ADMIN" && (
          <button id="addConferenceButton" onClick={handleAddConferenceClick}>
            Dodaj konferenciju
          </button>
        )}
        {userRoleName === "ROLE_SUPERADMIN" && (
          <button id="logOutButton" onClick={handleAddAdminClick}>
            Dodaj Admina
          </button>
        )}
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
        {(viewType === "entercode" || viewType === "homescreen") &&
          !isUserLoggedIn() && (
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
          viewType === "promo" ||
          viewType === "vote" ||
          viewType === "admin" ||
          viewType === "superAdmin") && (
          <button id="exitButton" onClick={handleExitClick}>
            Exit
          </button>
        )}
        {viewType === "admin" && isUserLoggedIn() && (
          <button id="dodajKonfButton" onClick={handleDodajKonfClick}>
            Dodaj Konferenciju
          </button>
        )}
        {viewType === "admin" && isUserLoggedIn() && (
          <button id="dodajPosterButton" onClick={handleDodajPosterClick}>
            Dodaj Poster
          </button>
        )}

        {(viewType === "homescreen" ||
          viewType === "liveVideo" ||
          viewType === "photo" ||
          viewType === "poster" ||
          viewType === "promo" ||
          viewType === "vote") && (
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
