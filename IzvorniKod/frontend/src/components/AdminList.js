import React, { useState } from "react";
import "../css/conferenceList.css";

// UNUSED
function AdminList({ admins, onDeleteAdmin }) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleDelete = (index) => {
    setDeleteConfirmation(index);
  };

  const confirmDelete = (index) => {
    onDeleteAdmin(index);
    setDeleteConfirmation(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  return (
    <div>
      <h2>Admini</h2>
      <ul className="list-admins">
        {admins.map((admin, index) => (
          <li key={index}>
            Admin: {admin.name} {admin.surname}
            <br />
            Konferencija: {admin.conf}
            <br />
            {admin.mail}
            <br />
            <button onClick={() => handleDelete(index)}>Obriši</button>
            {deleteConfirmation === index && (
              <div>
                <p className="confirmation-text">
                  Želite li stvarno obrisati ovog admina?
                </p>
                <button onClick={() => confirmDelete(index)}>Da</button>
                <button onClick={cancelDelete}>Ne</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminList;
