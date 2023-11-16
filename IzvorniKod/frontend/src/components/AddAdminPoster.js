import React, { useState, useEffect } from "react";
import "../css/addAdminPoster.css";
import axios from "axios";
import { getAuthToken } from "../services/AuthService";

const AddAdminPoster = ({ onConferenceClick }) => {
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState("");
  const [emailAuthor, setEmailAuthor] = useState("");
  const [posterName, setPosterName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedConferenceIndex, setSelectedConferenceIndex] = useState("");

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/konferencija/getAllKonf",
          {
            headers: {
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (response.status === 200) {
          setConferences(response.data);
        } else {
          console.error("Error fetching conferences:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchConferences();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const handleConferenceClick = (conference, index) => {
    setSelectedConference(conference);
    setSelectedConferenceIndex(index);
  };

  const handleSubmit = async () => {
    if (selectedConference) {
      const formData = new FormData();
      formData.append("nazivPoster", posterName);
      formData.append("imeAutor", authorName);
      formData.append("prezimeAutor", authorLastName);
      formData.append("emailAutor", emailAuthor);
      formData.append("file", fileName);

      try {
        const posterResponse = await axios.post(
          `http://localhost:8081/api/poster/${selectedConference.konfid}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (posterResponse.status === 200) {
          console.log("Poster uploaded");
        } else {
          console.error("Error fetching posters:", posterResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
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
              className={`conference-item ${
                index === selectedConferenceIndex ? "selected" : ""
              }`}
              onClick={() => handleConferenceClick(conference, index)}
            >
              <strong>{conference.ime}</strong>
              <p>Start Time: {conference.startTime}</p>
              <p>End Time: {conference.endTime}</p>
              <p>Location: {conference.mjesto.ulica}</p>
              <p>Postal Code: {conference.mjesto.pbr}</p>
              <p>Street: {conference.mjesto.ulica}</p>
              <p>Street Number: {conference.mjesto.kucBroj}</p>
            </li>
          ))}
        </ul>
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

export default AddAdminPoster;
