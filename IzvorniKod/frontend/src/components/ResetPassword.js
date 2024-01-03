import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      console.error("Token is missing");
    }
  }, [token]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match before sending the request
    if (password === confirmPassword && token) {
      axios
        .post(`/api/korisnici/reset-password?token=${token}`, {
          newPassword: password,
        })
        .then((response) => {
          console.log("Password updated successfully!", response);
        })
        .catch((error) => {
          console.error("Error updating password:", error);
        });
      setPassword("");
      setConfirmPassword("");
    } else {
      console.log("Passwords don't match or token is missing");
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="input-field"
            />
          </label>
          <br />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
