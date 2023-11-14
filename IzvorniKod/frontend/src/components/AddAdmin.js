import React, { useState } from 'react';
import "../css/addConference.css";
import AdminList from './AdminList';

function AdminForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    mail: '',
  });

  const [admins, setAdmins] = useState(
    JSON.parse(localStorage.getItem('admins')) || []
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
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   const isValidEmail = emailPattern.test(formData.mail);
    
  if (!isValidEmail) {
    alert('Molimo unesite ispravnu e-mail adresu.');
    return;
  }

   if (!formData.name || !formData.surname || !formData.mail || !isValidEmail) {
    alert('Molimo unesite sve informacije prije nego što dodate admina.');
    return;
    }
    
    
    const newAdmin = {
      name: formData.name,
      surname: formData.surname,
      mail: formData.mail,
    };

    setAdmins([...admins, newAdmin]);
    setFormData({
      name: '',
      surname: '',
      mail: '',
    });

    localStorage.setItem('admins', JSON.stringify([...admins, newAdmin]));
  };

  return (
    <div className="container">
      <h2>Dodaj novog Admina</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Ime admina:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Prezime admina:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Mail:</label>
          <input
            type="text"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <button type="submit" className="button">
            Dodaj admina
          </button>
        </div>
      </form>

      <AdminList
        admins={admins}
        onDeleteAdmin={handleDeleteAdmin}
      />
    </div>
  );
}

export default AdminForm;
