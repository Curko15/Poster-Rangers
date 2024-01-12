import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isLoggedInConference,
  isUserLoggedIn,
  logOutFromConference,
  userLogOut,
} from "../services/AuthService";

import "../css/header.css";
import { fetchRole } from "../services/DataService";

const Header = ({ viewType }) => {
  const navigate = useNavigate();
  const [userRoleName, setUserRoleName] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchData = async () => {
    if (isUserLoggedIn()) {
      try {
        const response = await fetchRole();
        const userRole = response.data;
        userRole.map((role) => setUserRoleName(role.name));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogOutClick = () => {
    logOutFromConference();
    userLogOut();
    setUserRoleName("");
    navigate("/");
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderDropdownMenu = () => {
    return (
      <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
        {userRoleName === "ROLE_ADMIN" && (
          <button
            id="addPosterButton"
            onClick={() => handleNavigation("/dodajPoster")}
          >
            Dodaj poster
          </button>
        )}
        {userRoleName === "ROLE_ADMIN" && (
          <button
            id="addPosterButton"
            onClick={() => handleNavigation("/dodajPromo")}
          >
            Dodaj promo
          </button>
        )}
        {userRoleName === "ROLE_ADMIN" && (
          <button
            id="addGalleryPhotoButton"
            onClick={() => handleNavigation("/dodajFoto")}
          >
            Dodaj foto
          </button>
        )}

        {userRoleName === "ROLE_ADMIN" && (
          <button
            id="addConferenceButton"
            onClick={() => handleNavigation("/admin")}
          >
            Dodaj konferenciju
          </button>
        )}
        {userRoleName === "ROLE_SUPERADMIN" && (
          <button
            id="logOutButton"
            onClick={() => handleNavigation("/superAdmin")}
          >
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
            <button id="loginButton" onClick={() => handleNavigation("/login")}>
              Prijava
            </button>
          )}
        {(viewType === "entercode" || viewType === "homescreen") &&
          !isUserLoggedIn() && (
            <button
              id="registerButton"
              onClick={() => handleNavigation("/register")}
            >
              Registracija
            </button>
          )}
        {(viewType === "homescreen" ||
          viewType === "liveVideo" ||
          viewType === "photo" ||
          viewType === "poster" ||
          viewType === "promo" ||
          viewType === "vote") && (
          <button id="konfButton" onClick={() => handleNavigation("/home")}>
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
            <button id="videoButton" onClick={() => handleNavigation("/live")}>
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
            <button
              id="posterButton"
              onClick={() => handleNavigation("/posteri")}
            >
              Posteri
            </button>
          )}
        {isUserLoggedIn() &&
          (viewType === "homescreen" ||
            viewType === "liveVideo" ||
            viewType === "photo" ||
            viewType === "poster" ||
            viewType === "promo" ||
            viewType === "vote") && (
            <button id="fotoButton" onClick={() => handleNavigation("/foto")}>
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
            <button id="promoButton" onClick={() => handleNavigation("/promo")}>
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
            <button
              id="voteButton"
              onClick={() => handleNavigation("/glasanje")}
            >
              Glasanje
            </button>
          )}

        {isUserLoggedIn() && viewType !== "ChangePassword" && (
          <button
            id="changePassword"
            onClick={() => handleNavigation("/promijeniLozinku")}
          >
            Promijeni Lozinku
          </button>
        )}
        {isLoggedInConference() && (
          <button id="exitButton" onClick={handleExitClick}>
            Izlaz
          </button>
        )}
        {isUserLoggedIn() && (
          <button id="logOutButton" onClick={handleLogOutClick}>
            Odjava
          </button>
        )}
      </div>
    );
  };

  return (
    <header className="headerTrack">
      <nav>
        <div className="navList">
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={handleToggleMenu}>
              ☰
            </button>
            {renderDropdownMenu()}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
