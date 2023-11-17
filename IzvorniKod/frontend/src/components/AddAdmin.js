import React, { useState } from "react";
import { getAuthToken } from "../services/AuthService";
import axios from "axios";

import "../css/addConference.css";

function AddAdmin() {
  const [emailAdmin, setEmailAdmin] = useState("");
  const [adminPassword, setAdminPassword] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = {
      ime: adminName,
      prezime: adminLastName,
      email: emailAdmin,
      password: adminPassword,
    };

    try {
      const response = await axios.post("/api/korisnici/registerAdmin", admin, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken().token,
        },
      });

      if (response.status === 200) {
        console.log("Admin submitted successfully");
        setAdminName("");
        setAdminLastName("");
        setEmailAdmin("");
        setAdminPassword("");
      } else {
        console.error("Failed to submit new admin");
      }
    } catch (error) {
      console.error("Error submitting admin:", error.message);
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h2>Dodaj novog admina</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Ime:
            <input
              type="text"
              name="ime"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <label className="label">
            Prezime:
            <input
              type="text"
              name="prezime"
              value={adminLastName}
              onChange={(e) => setAdminLastName(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <label className="label">
            Email:
            <input
              type="text"
              name="email"
              value={emailAdmin}
              onChange={(e) => setEmailAdmin(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <label className="label">
            Lozinka:
            <input
              type="password"
              name="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="input-field"
              required
              hidden={false}
            />
          </label>

          <div className="button-container">
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAdmin;
