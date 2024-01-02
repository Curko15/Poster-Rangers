import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from 'validator'
import {
  getLoggedInUser,
  isLoggedInConference,
  saveLoggedInUser,
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
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const formContainerRef = useRef(null);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false); // New state for redirection


  const validatePassword = (value, isRegistration) => {
    if (isRegistration) {
      return validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });
    } else {
      // Ako nije registracija, resetiraj poruku o grešci za lozinku
      setPasswordError("");
      return true;
    }
  };
  

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
      
      if (password !== confirmPassword) {
        setConfirmPasswordError("Lozinke se ne podudaraju");
        return;
      }
    }
  
    const requestData =
      viewType === "login"
        ? { email: email, password: password }
        : { email: email, password: password, ime: name, prezime: lastName };
  
    const url = `/api/korisnici/${viewType === "login" ? "authenticatePP" : "registerPP"}`;
    try {
      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const authToken = await response.data;
      saveAuthToken(authToken);
  
      saveLoggedInUser(email, password);
      const getRoleData = {
        email: getLoggedInUser().userEmail,
        password: getLoggedInUser().userPass,
      };
  
      try {
        const responseRole = await axios.post("/api/korisnici/getRole", getRoleData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
        });
  
        const userRole = responseRole.data.find((role) => true)?.name;
  
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
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Došlo je do pogreške pri dohvaćanju uloge korisnika.");
      }
  
    } catch (error) {
      console.error("Error:", error);
  
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setErrorMessage("Pogrešan email ili lozinka");
      } else {
        console.error("Error during authentication:", error);
        setErrorMessage("Došlo je do pogreške pri prijavi. Molimo pokušajte ponovno.");
      }
    }
  };

   const handlePasswordBlur = () => {
    // Validate the password onBlur
    const isPasswordValid = validatePassword(password, viewType === "register");
    
    if (!isPasswordValid) {
      setPasswordError(
        "Lozinka mora imati barem 8 znakova, najmanje jedno veliko slovo, najmanje jedan broj i najmanje jedan simbol."
      );
    } else {
      // If the password is valid, reset the error message
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
  
    setConfirmPassword(confirmPasswordValue);
  
    if (confirmPasswordValue !== password) {
      setConfirmPasswordError("Lozinke se ne podudaraju.");
    } else {
      setConfirmPasswordError("");
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
                      onChange={(e) => {setLastName(e.target.value)}}
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
                  onBlur={handlePasswordBlur}
                  className="input-field"
              />
              {passwordError && viewType==="register" && <p className="error-message">{passwordError}</p>}
              </label>
              <br />
              {viewType === "register" && (
              <>
                <label>
                  Potvrdi lozinku:
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="input-field"
                  />
                  {confirmPasswordError && (
                    <p className="error-message">{confirmPasswordError}</p>
                  )}
                </label>
                <br />
              </>
            )}
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
