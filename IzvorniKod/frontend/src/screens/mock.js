import React, { useState, useEffect } from "react";
import "../css/mock.css";

const ConferenceList = ({ onConferenceClick }) => {
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState("");
  const [emailAuthor, setEmailAuthor] = useState("");
  const [posterName, setPosterName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/konferencija/getAllKonf",
          {
            method: "GET",
          },
        );

        if (response.ok) {
          const conferenceData = await response.json();

          setConferences(conferenceData);
        } else {
          console.error("Error fetching conferences:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchConferences();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const handleConferenceClick = (conference) => {
    setSelectedConference(conference);
  };

  const handleSubmit = async () => {
    if (selectedConference) {
      const formData = new FormData();
      formData.append("nazivPoster", posterName);
      formData.append("imeAutor", authorName);
      formData.append("prezimeAutor", authorLastName);
      formData.append("emailAutor", emailAuthor);
      formData.append("file", fileName);

      console.log("Form Data:", formData);
      console.log("Selected Conference:", selectedConference.konfid);

      const posterResponse = await fetch(
        `http://localhost:8081/poster/${selectedConference.konfid}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (posterResponse.ok) {
        const posterData = await posterResponse.json();
        console.log("Fetched Posters:", posterData);
      } else {
        console.error("Error fetching posters:", posterResponse.statusText);
      }
    }
  };

  return (
    <div className="root">
      <div className="conference-list-container">
        <h2>Conference List</h2>
        <ul className="conference-list">
          {conferences.map((conference, index) => (
            <li
              key={index}
              className="conference-item"
              onClick={() => handleConferenceClick(conference)}
            >
              <strong>{conference.ime}</strong>
              <p>Start Time: {conference.startTime}</p>
              <p>End Time: {conference.endTime}</p>
              <p>Location: {conference.nazivMjesta}</p>
              <p>Postal Code: {conference.pbr}</p>
              <p>Street: {conference.ulica}</p>
              <p>Street Number: {conference.kucniBroj}</p>
            </li>
          ))}
        </ul>

        {selectedConference && (
          <div className="selected-conference">
            <h3>Selected Conference Details</h3>
            <p>Password: {selectedConference.konfid}</p>
          </div>
        )}
      </div>
      <div className="center-container">
        <div className="login-container">
          <h2>Add New Poster To Conference</h2>
          <label>
            Poster Name:
            <input
              type="text"
              name="posterName"
              value={posterName}
              onChange={(e) => setPosterName(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <label>
            Author Name:
            <input
              type="text"
              name="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <label>
            Author LastName:
            <input
              type="text"
              name="authorLastName"
              value={authorLastName}
              onChange={(e) => setAuthorLastName(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <label>
            Author Email:
            <input
              type="text"
              name="emailAuthor"
              value={emailAuthor}
              onChange={(e) => setEmailAuthor(e.target.value)}
              className="input-field"
              required
            />
          </label>

          <label>
            Poster File:
            <input
              type="file"
              name="file"
              onChange={(e) => setFileName(e.target.files[0])}
              className="input-field"
              required
            />
          </label>
          <button onClick={handleSubmit} className="submit-poster-button">
            Submit Poster
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConferenceList;
