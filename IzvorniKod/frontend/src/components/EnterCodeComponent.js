import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../screens/HomeScreen";
import "../css/enterCode.css";
import { getAuthToken, setConferenceId } from "../services/AuthService";
import axios from "axios";

const EnterCodeScreen = () => {
  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleCodeChange = (event) => {
    setUserCode(event.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/konferencija/loginKonf",
        {
          password: userCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
        },
      );

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
      setError("Error during login");
    }
  };

  return (
    <div className="codeCard">
      <h1>Welcome!</h1>
      <div className="inputForm">
        <span className="spanCard">Enter Your Code:</span>
        <input
          className="codeInput"
          type="text"
          value={userCode}
          onChange={handleCodeChange}
          placeholder="Insert 6 digit code here"
        />
        <button
          className="submitButton"
          onClick={handleSubmit}
          disabled={userCode.length !== 6}
        >
          Go
        </button>
      </div>
      {error && <p className="errorText">{error}</p>}
      <p className="codeInfo">Check src/App.js file for routing info.</p>
    </div>
  );
};

export default EnterCodeScreen;
