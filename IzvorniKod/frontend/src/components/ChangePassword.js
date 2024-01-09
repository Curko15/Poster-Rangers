import React, { useState } from "react";
import axios from "axios";
import { getAuthToken, getLoggedInUser } from "../services/AuthService";
import PasswordInput from "./PasswordInput";
import validator from "validator";

import "../css/authetication.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const userEmail = getLoggedInUser().userEmail;

  const validatePassword = (value) => {
    return validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  };

  const handlePasswordBlur = () => {
    const isPasswordValid = validatePassword(newPassword);
  
    if (!isPasswordValid) {
      setNewPasswordError(
        "Lozinka mora imati barem 8 znakova, najmanje jedno veliko slovo, najmanje jedan broj i najmanje jedan simbol.",
      );
    } else {
      setNewPasswordError("");
  
      if (newPassword === currentPassword) {
        setNewPasswordError(
          "Nova lozinka ne smije biti ista kao trenutna lozinka!",
        );
      }
    }
  };
  

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Lozinke se ne podudaraju!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Molimo ispunite sva polja!");
      return;
    }

    if (newPassword === currentPassword) {
      setNewPasswordError("Nova lozinka ne smije biti ista kao trenutna lozinka!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Lozinke se ne podudaraju.");
      return;
    }

    const isPasswordValid = validatePassword(newPassword);

    if (!isPasswordValid) {
      setNewPasswordError(
        "Lozinka mora imati barem 8 znakova, najmanje jedno veliko slovo, najmanje jedan broj i najmanje jedan simbol.",
      );
      return;
    }

    const changePasswordData = {
      oldPassword: currentPassword,
      newPassword: newPassword,
      email: userEmail,
    };

    try {
      await axios.post(`/api/korisnici/change-password`, changePasswordData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken().token,
        },
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Lozinka uspješno promijenjena!");
    } catch (error) {
      console.error("Error:", error.message);
      setMessage("Promjena lozinke nije uspjela. Molimo provjerite trenutnu lozinku i pokušajte ponovno.");
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h2>Promijeni lozinku</h2>
        {message && (
          <p
            className={`message ${
              message.startsWith("Lozinka uspješno") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}{" "}
        <form onSubmit={handleSubmit}>
          <PasswordInput
            id={"currentPassword"}
            label={"Trenutna lozinka: "}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {currentPasswordError && (
            <p className="error-message">{currentPasswordError}</p>
          )}
          <PasswordInput
            id={"newPassword"}
            label={"Nova lozinka: "}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          {newPasswordError && (
            <p className="error-message">{newPasswordError}</p>
          )}
          <PasswordInput
            id={"confirmPassword"}
            label={"Potvrdi lozinku: "}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
          />
          {confirmPasswordError && (
            <p className="error-message">{confirmPasswordError}</p>
          )}
          <div className="button-container">
            <button type="submit">Promijeni lozinku</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
