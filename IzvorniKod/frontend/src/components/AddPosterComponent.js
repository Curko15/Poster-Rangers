import React, { useState, useRef } from "react";
import "../css/addposter.css";
import { getAuthToken, getConferenceId } from "../services/AuthService";
import axios from "axios";
const AddPoserComponent = () => {
  const [emailAuthor, setEmailAuthor] = useState("");
  const [posterName, setPosterName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [fileName, setFileName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch conference ID
      const response = await axios.post(
        "http://localhost:8081/api/konferencija/getKonfId",
        {
          password: getConferenceId(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
        },
      );

      const url = `http://localhost:8081/api/poster/${response.data}`;

      const formData = new FormData();
      formData.append("nazivPoster", posterName);
      formData.append("imeAutor", authorName);
      formData.append("prezimeAutor", authorLastName);
      formData.append("emailAutor", emailAuthor);
      formData.append("file", fileName);

      const posterResponse = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getAuthToken().token,
        },
      });

      if (posterResponse.status === 200) {
        console.log("Poster submitted successfully");
      } else {
        console.error("Failed to submit poster");
      }
    } catch (error) {
      console.error("Error submitting poster:", error.message);
    }
  };

  return (
    <div className="center-container">
      <div className="login-container">
        <h2>Add New Poster To Conference</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Submit Poster</button>
        </form>
      </div>
    </div>
  );
};

export default AddPoserComponent;
