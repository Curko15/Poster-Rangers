import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
import { CSSTransition } from "react-transition-group";

const Header = ({ viewType }) => {
  const navigate = useNavigate();
  const [userRoleName, setUserRoleName] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleNav = () => {
    setIsNavVisible((isNavVisible) => !isNavVisible);
  };

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
      setIsNavVisible(false); // Close navList on small screens
    } else {
      setIsSmallScreen(false);
      setIsNavVisible(true); // Open navList on larger screens
    }
  };

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
            Dodaj admina
          </button>
        )}
        {(viewType === "login" || viewType === "register") && (
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
            <button id="voteButton" onClick={handleVoteClick}>
              Glasanje
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
      </>
    );
  };

  return (
    <header className="headerTrack">
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
        >
        <nav style={{
            display: isNavVisible ? 'grid' : 'none',
            /* other styles */
          }}>
          <div className="navList">{renderButtons()}</div>
        </nav>
      </CSSTransition>
      {isSmallScreen && (
        <button onClick={toggleNav} className="Burger">
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
    </header>
  );
};

export default Header;
