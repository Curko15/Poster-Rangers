import React, { useState } from "react";
import "../css/authetication.css";
import AdminList from "./AdminList";
import { getConferenceId } from "../services/AuthService";

function AdminForm() {
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
      hashLozinke: adminPassword,
    };

    try {
      const response = await fetch(
        "http://localhost:8081/korisnici/registerAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(admin),
        },
      );
      if (response.ok) {
        console.log("Admin submitted successfully");
        setAdminName("");
        setAdminLastName("");
        setEmailAdmin("");
        setAdminPassword("");
      } else {
        console.error("Failed to submit new admin");
      }
    } catch (error) {
      console.error("Error submitting admin:", error);
    }
  };

  return (
    <div className="center-container">
      <div className="login-container">
        <h2>Dodaj novog Admina</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Ime admina:
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
            Prezime admina:
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
            Mail:
            <input
              type="text"
              name="email"
              value={emailAdmin}
              onChange={(e) => setEmailAdmin(e.target.value)}
              className="input-field"
              required
            />
          </label>

          {/* Add a new input field for the password */}

          <label className="label">
            Password:
            <input
              type="password"
              name="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <button type="submit" className="button" onClick={handleSubmit}>
            Dodaj admina
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminForm;
