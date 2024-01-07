import React, { useState } from "react";
import axios from "axios";
import { getAuthToken, getLoggedInUser } from "../services/AuthService";
import PasswordInput from "./PaswordInput";

import "../css/main.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userEmail = getLoggedInUser().userEmail;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are necessary!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    const t = getAuthToken().token;
    console.log(t);

    const changePasswordData = {
      oldPassword: currentPassword,
      newPassword: newPassword,
      email: userEmail,
    };

    try {
      const changePassword = await axios.post(
        `/api/korisnici/change-password`,
        changePasswordData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
        },
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h2>Promijeni Lozinku</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <PasswordInput
            id={"currentPassword"}
            label={"Trenutna lozinka: "}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            id={"newPassword"}
            label={"Nova lozinka: "}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            id={"confirmPassword"}
            label={"Potvrda lozinke: "}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="button-container">
            <button type="submit">Promijeni Lozinku</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
