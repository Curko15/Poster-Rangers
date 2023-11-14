import React, { useState } from "react";
import "../css/addConference.css";
import AdminList from "./AdminList";

function AdminForm() {
  const [formData, setFormData] = useState({
    ime: "", // changed from 'name'
    prezime: "", // changed from 'surname'
    email: "",
    password: "",
  });

  const [admins, setAdmins] = useState(
    JSON.parse(localStorage.getItem("admins")) || [],
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteAdmin = (index) => {
    const updatedAdmins = [...admins];
    updatedAdmins.splice(index, 1);
    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(formData.email);

    if (!isValidEmail) {
      alert("Molimo unesite ispravnu e-mail adresu.");
      return;
    }

    if (
      !formData.ime ||
      !formData.prezime ||
      !formData.email ||
      !formData.password ||
      !isValidEmail
    ) {
      alert("Molimo unesite sve informacije prije nego što dodate admina.");
      return;
    }

    const newAdmin = {
      ime: formData.ime,
      prezime: formData.prezime,
      email: formData.email,
      hashLozinke: formData.password,
    };

    setAdmins([...admins, newAdmin]);
    setFormData({
      ime: "",
      prezime: "",
      email: "",
      hashLozinke: "",
    });

    try {
      const response = await fetch(
        "http://localhost:8081/korisnici/registerAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAdmin),
        },
      );
      let data = response.json();
      console.log(data);
    } catch (error) {
      console.error("Error during admin registration:", error);
    }
  };

  return (
    <div className="container">
      <h2>Dodaj novog Admina</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Ime admina:</label>
          <input
            type="text"
            name="ime"
            value={formData.ime}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Prezime admina:</label>
          <input
            type="text"
            name="prezime"
            value={formData.prezime}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Mail:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </div>
        {/* Add a new input field for the password */}
        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <button type="submit" className="button" onClick={handleSubmit}>
            Dodaj admina
          </button>
        </div>
      </form>
      <AdminList admins={admins} onDeleteAdmin={handleDeleteAdmin} />
    </div>
  );
}

export default AdminForm;
