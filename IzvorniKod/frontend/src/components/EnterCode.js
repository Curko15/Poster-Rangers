import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setConferenceId } from "../services/AuthService";
import "../screens/HomeScreen";

import "../css/enterCode.css";

const EnterCode = () => {
  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCodeChange = (event) => {
    setUserCode(event.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/konferencija/loginKonf", {
        password: userCode,
      });

      setConferenceId(userCode);

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/home");
      } else {
        console.error("Login failed");
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Nepravilan pristupni kod");
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
      {error && <p className="errorText">{error}</p>}
    </div>
  );
};

export default EnterCode;
