import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getLoggedInUser,
  isLoggedInConference,
  saveLoggedInUser,
  storeToken,
  saveAuthToken,
  getAuthToken,
} from "../services/AuthService";

import "../css/authetication.css";

const Authentication = ({ viewType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newPasswordReq, setNewPasswordReq] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const formContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (viewType === "login") {
      if (!email || !password) {
        setErrorMessage("Molimo unesite email i lozinku");
        return;
      }
    } else {
      if (!email || !password || !name || !lastName) {
        setErrorMessage("Molimo unesite sve podatke");
        return;
      }
    }

    const token = window.btoa(email + ":" + password);
    storeToken(token);

    const requestData =
      viewType === "login"
        ? { email: email, password: password }
        : { email: email, password: password, ime: name, prezime: lastName };

    const url = `/api/korisnici/${
      viewType === "login" ? "authenticatePP" : "registerPP"
    }`;
    let response;
    try {
      response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Pogrešan email ili lozinka");
    }

    const authToken = await response.data;
    saveAuthToken(authToken);

    saveLoggedInUser(email, password);
    const getRoleData = {
      email: getLoggedInUser().userEmail,
      password: getLoggedInUser().userPass,
    };

    let responseRole;
    try {
      responseRole = await axios.post("/api/korisnici/getRole", getRoleData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken().token,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }

    let userRole = responseRole.data.find((role) => true)?.name;

    if (userRole === "ROLE_ADMIN") {
      navigate("/admin");
    } else if (userRole === "ROLE_SUPERADMIN") {
      navigate("/superAdmin");
    } else if (userRole === "ROLE_KORISNIK") {
      if (isLoggedInConference()) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }
  };
  const handleNewPasswordReq = async (e) => {
    e.preventDefault();

    if (!newEmail) {
      setErrorMessage("Molimo unesite email");
      return;
    }

    const requestData = { email: newEmail };

    const url = "/api/korisnici/password-reset-request";

    let response;
    try {
      response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Pogrešan email");
    }
  };

  useEffect(() => {
    const handleResize = (entries) => {};
    const resizeObserver = new ResizeObserver(handleResize);

    if (formContainerRef.current) {
      resizeObserver.observe(formContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [formContainerRef]);

  return (
    <div className="center-container">
      <div ref={formContainerRef} className="form-container">
        {!newPasswordReq && (
          <>
            <h2>{viewType === "login" ? "Login" : "Registracija"}</h2>
            <form onSubmit={handleSubmit}>
              {viewType === "register" && (
                <>
                  <label>
                    Ime:
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                    />
                  </label>
                  <br />
                  <label>
                    Prezime:
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input-field"
                    />
                  </label>
                  <br />
                </>
              )}
              <label>
                Email:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </label>
              <br />
              <label>
                Lozinka:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
              </label>
              <br />
              {viewType === "login" && (
                <p
                  onClick={() => setNewPasswordReq(true)}
                  className="newPassword"
                >
                  Forgot Your Password?
                </p>
              )}

              <div className="button-container">
                <button type="submit" className="submit-button">
                  {viewType === "login" ? "Login" : "Registracija"}
                </button>
              </div>
              {errorMessage && (
                <h2 className="error-message">{errorMessage}</h2>
              )}
            </form>
          </>
        )}
        {newPasswordReq && (
          <>
            <h2>Forgot Your Password?</h2>
            <form onSubmit={handleNewPasswordReq}>
              <label>
                Email:
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="input-field"
                />
              </label>
              <br />
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Request password reset
                </button>
              </div>
              <br />
              <div className="button-container">
                <button
                  className="submit-button"
                  onClick={() => setNewPasswordReq(false)}
                >
                  Back to Login
                </button>
              </div>

              {errorMessage && (
                <h2 className="error-message">{errorMessage}</h2>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;
