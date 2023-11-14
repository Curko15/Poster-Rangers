import React, { useState, useEffect, useRef } from "react";
import "../css/authetication.css";
import { saveLoggedInUser, storeToken } from "../services/AuthService";

const AuthenticationComponent = ({ viewType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const formContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.btoa(email + ":" + password);
    storeToken(token);

    const url = `/korisnici/${viewType === "login" ? "login" : "register"}`;
    const requestData =
      viewType === "login"
        ? { email: email, hashLozinke: password }
        : { email: email, hashLozinke: password, ime: name, prezime: lastName };

    if (viewType === "login") {
      saveLoggedInUser(requestData);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log(
          `${viewType === "login" ? "Login" : "Registration"} successful`
        );
      } else {
        console.log(
          `${viewType === "login" ? "Login" : "Registration"} failed`
        );
      }
    } catch (error) {
      console.error(
        `Error during ${viewType === "login" ? "login" : "registration"}:`,
        error
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
