import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAuthToken,
  getLoggedInUser,
  isLoggedInConference,
  isUserLoggedIn,
  logOutFromConference,
  userLogOut,
} from "../services/AuthService";

import "../css/header.css";

const Header = ({ viewType }) => {
  const navigate = useNavigate();
  const [userRoleName, setUserRoleName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (isUserLoggedIn()) {
        try {
          const response = await axios.post(
            "/api/korisnici/getRole",
            {
              email: getLoggedInUser().userEmail,
              password: getLoggedInUser().userPass,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAuthToken().token,
              },
            },
          );

          const userRole = response.data;
          userRole.map((role) => setUserRoleName(role.name));
        } catch (error) {
          console.error("Error fetching data:", error.message);
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
    logOutFromConference();
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

  const handleAddPosterClick = () => {
    navigate("/dodajPoster");
  };

  const handleAddPromoClick = () => {
    navigate("/dodajPromo");
  };

  const handleAddConferenceClick = () => {
    navigate("/admin");
  };

  const handleAddAdminClick = () => {
    navigate("/superAdmin");
  };

  const handleChangePassword = () => {
    navigate("/promijeniLozinku");
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
          <button id="addPosterButton" onClick={handleAddPromoClick}>
            Dodaj promo
          </button>
        )}
        {userRoleName === "ROLE_ADMIN" && (
          <button id="addConferenceButton" onClick={handleAddConferenceClick}>
            Dodaj konferenciju
          </button>
        )}
        {userRoleName === "ROLE_SUPERADMIN" && (
          <button id="logOutButton" onClick={handleAddAdminClick}>
            Dodaj admina
          </button>
        )}
        {(viewType === "login" ||
          viewType === "register" ||
          viewType === "ChangePassword") && (
          <button id="backButton" onClick={handleBackClick}>
            Natrag
          </button>
        )}
        {(viewType === "entercode" || viewType === "homescreen") &&
          !isUserLoggedIn() && (
            <button id="loginButton" onClick={handleLoginClick}>
              Prijava
            </button>
          )}
        {(viewType === "entercode" || viewType === "homescreen") &&
          !isUserLoggedIn() && (
            <button id="registerButton" onClick={handleRegisterClick}>
              Registracija
            </button>
          )}
        {isUserLoggedIn() && (
          <button id="logOutButton" onClick={handleLogOutClick}>
            Odjava
          </button>
        )}
        {isUserLoggedIn() && viewType !== "ChangePassword" && (
          <button id="changePassword" onClick={handleChangePassword}>
            Promijeni Lozinku
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
            Izlaz
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
              Glasanje
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
