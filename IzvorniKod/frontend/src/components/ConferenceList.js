import React, { useState } from 'react';
import "../css/conferenceList.css";


function ConferenceList({ conferences, onDeleteConference }) {
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  
    const handleDelete = (index) => {
      setDeleteConfirmation(index);
    };
  
    const confirmDelete = (index) => {
      onDeleteConference(index);
      setDeleteConfirmation(null);
    };
  
    const cancelDelete = () => {
      setDeleteConfirmation(null);
    };

  return (
    <div>
      <h2>Popis konferencija</h2>
      <ul className='list-container'>
        {conferences.map((conference, index) => (
          <li key={index}>
            Naziv konferencije: {conference.name}<br />
            Datum početka: {conference.start}<br />
            Datum završetka: {conference.end}<br />
            Lokacija: {conference.location}<br />
            
            <button>Dodaj fotografije</button>
            <button>Dodaj postere</button>
            <button>Dodaj promo materijal</button>  
            <button onClick={() => handleDelete(index)}>Obriši</button>
                
            {deleteConfirmation === index && (
              <div>
                <p className="confirmation-text">Želite li stvarno obrisati ovu konferenciju?</p>
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

export default ConferenceList;
