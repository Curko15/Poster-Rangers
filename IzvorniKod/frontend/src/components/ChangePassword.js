import React, { useState } from "react";
import { getAuthToken, getLoggedInUser } from "../services/AuthService";
import "../css/main.css";
import axios from "axios";
const ChangePassword = () => {
  const [mail, setMail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mail || !currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are necessary!");
      return;
    }
    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Here you can implement your logic to send the password change request
    // For demonstration purposes, this just logs the data to the console
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    const t = getAuthToken().token;
    console.log(t);

    const changePasswordData = {
      oldPassword: currentPassword,
      newPassword: newPassword,
      email: mail,
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

      // Reset the form after submission
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password changed successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h2>Change Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="mail"
              id="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="button-container">
            <button type="submit">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
