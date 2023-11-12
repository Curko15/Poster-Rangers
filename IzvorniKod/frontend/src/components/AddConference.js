import React, { useState } from 'react';
import "../css/addConference.css";
import ConferenceList from './ConferenceList';

function AddConference() {
  const [formData, setFormData] = useState({
    name: '',
    start: '',
    end: '',
    location: '',
  });

  const [conferences, setConferences] = useState(
    JSON.parse(localStorage.getItem('conferences')) || []
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteConference = (index) => {
    const updatedConferences = [...conferences];
    updatedConferences.splice(index, 1);
    setConferences(updatedConferences);
    localStorage.setItem('conferences', JSON.stringify(updatedConferences));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { start, end } = formData;
    const currentDate = new Date();

    if (new Date(start) < currentDate) {
      alert('Datum početka konferencije je prošao.');
      return;
    }

    if (new Date(end) < currentDate) {
      alert('Datum završetka konferencije je prošao');
      return;
    }

    if (new Date(end) < new Date(start)) {
      alert('Datum završetka mora biti nakon datuma početka');
      return;
    }

    if (!formData.name || !formData.start || !formData.end || !formData.location) {
      alert('Morate popuniti sva polja prije nego što dodate konferenciju.');
      return;
    }

    const formattedStartDate = formatDate(formData.start);
    const formattedEndDate = formatDate(formData.end);

    const newConference = {
      name: formData.name,
      start: formattedStartDate,
      end: formattedEndDate,
      location: formData.location,
    };

    setConferences([...conferences, newConference]);
    setFormData({
      name: '',
      start: '',
      end: '',
      location: '',
    });

    localStorage.setItem('conferences', JSON.stringify([...conferences, newConference]));
  };

  return (
    <div className="container">
      <h2>Dodaj novu konferenciju</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Naziv konferencije:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Datum početka:</label>
          <input
            type="date"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Datum završetka:</label>
          <input
            type="date"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Lokacija:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <button type="submit" className="button">
            Dodaj konferenciju
          </button>
        </div>
      </form>

      <ConferenceList
        conferences={conferences}
        onDeleteConference={handleDeleteConference}
      />
    </div>
  );
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString();
}

export default AddConference;
