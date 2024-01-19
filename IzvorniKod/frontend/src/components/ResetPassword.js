import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PasswordInput from "./PasswordInput";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setErrorMessage("");
      setSuccessMessage("Uspješno resetirana lozinka!");
    } else {
      setErrorMessage("Lozinke nisu jednake ili nedostaje token!");
      console.log("Passwords don't match or token is missing");
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {successMessage && (
            <h2 className="success-message">{successMessage}</h2>
          )}
          <PasswordInput
            id={"newPassword"}
            label={"Nova lozinka: "}
            value={password}
            onChange={handlePasswordChange}
          />
          <PasswordInput
            id={"confirmPassword"}
            label={"Potvrda lozinke: "}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button type="submit">Resetiraj lozinku</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
