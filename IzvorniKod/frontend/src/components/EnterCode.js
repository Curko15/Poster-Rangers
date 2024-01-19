import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setConferenceData, setConferenceId } from "../services/AuthService";
import "../screens/HomeScreen";

import "../css/enterCode.css";

const EnterCode = () => {
  const [userCode, setUserCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCodeChange = (event) => {
    setUserCode(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/konferencija/loginKonf", {
        password: userCode,
      });

      setConferenceId(userCode);

      if (response.status === 200) {
        console.log("Login successful");
        setConferenceData(response.data);
        navigate("/home");
      } else {
        console.error("Login failed");
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setErrorMessage("Nepravilan pristupni kod");
    }
  };

  return (
    <div className="codeCard">
      <h1>Dobrodošli!</h1>
      <div className="inputForm">
        <span className="spanCard">Upiši kod i pristupi konferenciji:</span>
        <input
          className="codeInput"
          type="text"
          value={userCode}
          onChange={handleCodeChange}
          placeholder="Ovdje upiši svoj kod"
        />
        <button className="submitButton" onClick={handleSubmit}>
          Kreni
        </button>
      </div>
      {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
    </div>
  );
};

export default EnterCode;
