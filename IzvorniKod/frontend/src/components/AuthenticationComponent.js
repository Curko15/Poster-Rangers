import React, { useState, useEffect, useRef } from "react";
import "../css/authetication.css";
import {
  getLoggedInUser,
  isLoggedInConference,
  saveLoggedInUser,
  storeToken,
  saveAuthToken,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";

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
        ? { email: email, hashLozinke: password }
        : { email: email, hashLozinke: password, ime: name, prezime: lastName };

    try {
      const url = `http://localhost:8081/api/korisnici/${
        viewType === "login" ? "authenticatePP" : "registerPP"
      }`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const authToken = await response.json();

      if (response.ok) {
        saveAuthToken(authToken);

        saveLoggedInUser(email, password);
        console.log(
          `${viewType === "login" ? "Login" : "Registration"} successful`,
        );
        try {
          console.log("Bearer " + authToken.token);
          console.log("bok: " + getLoggedInUser().userEmail);
          console.log("bok2: " + getLoggedInUser().userPass);
          const response = await fetch(
            "http://localhost:8081/api/korisnici/getRole",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken.token,
              },
              body: JSON.stringify({
                email: getLoggedInUser().userEmail,
                password: getLoggedInUser().userPass,
              }),
            },
          );
          const userRole = await response.json(); //TODO: here is the role
          let userRoleName;
          userRole.map((role) => (userRoleName = role.name));

          if (userRoleName === "ROLE_ADMIN") {
            navigate("/admin");
          } else if (userRoleName === "ROLE_SUPERADMIN") {
            navigate("/superAdmin");
          } else if (userRoleName === "ROLE_KORISNIK") {
            if (isLoggedInConference()) {
              navigate("/home");
            } else {
              navigate("/");
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log(
          `${viewType === "login" ? "Login" : "Registration"} failed`,
        );
      }
    } catch (error) {
      console.error(
        `Error during ${viewType === "login" ? "login" : "registration"}:`,
        error,
      );
    }
  };

  useEffect(() => {
    const handleResize = (entries) => {
      console.log("Resize event:", entries);
    };

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
