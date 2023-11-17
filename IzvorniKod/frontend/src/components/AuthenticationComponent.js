import React, { useState, useEffect, useRef } from "react";
import "../css/authetication.css";
import {
  getLoggedInUser,
  isLoggedInConference,
  saveLoggedInUser,
  storeToken,
  saveAuthToken,
  getAuthToken,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthenticationComponent = ({ viewType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const formContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.btoa(email + ":" + password);
    storeToken(token);

    const requestData =
      viewType === "login"
        ? { email: email, password: password }
        : { email: email, password: password, ime: name, prezime: lastName };

    const url = `http://localhost:8081/api/korisnici/${
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
    }

    const authToken = await response.data;
    saveAuthToken(authToken);

    saveLoggedInUser(email, password);
    const getRoleData = {
      email: getLoggedInUser().userEmail,
      password: getLoggedInUser().userPass,
    };

    console.log(getAuthToken().token);
    let responseRole;
    try {
      responseRole = await axios.post(
        "http://localhost:8081/api/korisnici/getRole",
        getRoleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
        },
      );
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
      <div ref={formContainerRef} className="login-container">
        <h2>{viewType === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {viewType === "register" && (
            <>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </label>
              <br />
              <label>
                Last name:
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
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <div className="button-container">
            <button type="submit" className="submit-button">
              {viewType === "login" ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationComponent;
