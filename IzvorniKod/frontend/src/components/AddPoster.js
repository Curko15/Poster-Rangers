import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../services/AuthService";

import "../css/addPoster.css";
import { BounceLoader } from "react-spinners";

const AddPoster = () => {
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState("");
  const [emailAuthor, setEmailAuthor] = useState("");
  const [posterName, setPosterName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [fileName, setFileName] = useState("");

  const [selectedConferenceIndex, setSelectedConferenceIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dateTimeFormater = (dateTime) => {
    function padWithZero(number) {
      return number.toString().padStart(2, "0");
    }

    const dateObj = new Date(dateTime);
    return `${padWithZero(dateObj.getHours())}:${padWithZero(
      dateObj.getMinutes(),
    )} ${padWithZero(dateObj.getDate())}.${padWithZero(
      dateObj.getMonth() + 1,
    )}.${dateObj.getFullYear()}`;
  };

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get("/api/konferencija/getAllKonf", {
          headers: {
            Authorization: "Bearer " + getAuthToken().token,
          },
        });

        if (response.status === 200) {
          setConferences(response.data);
        } else {
          console.error("Error fetching conferences:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const handleConferenceClick = (conference, index) => {
    setSelectedConference(conference);
    setSelectedConferenceIndex(index);
  };

  const handleSubmit = async () => {
    if (selectedConference) {
      if (
        !authorName ||
        !authorLastName ||
        !emailAuthor ||
        !posterName ||
        !fileName
      ) {
        setErrorMessage("Sva polja su obavezna!");
        return;
      }
      const formData = new FormData();
      formData.append("nazivPoster", posterName);
      formData.append("imeAutor", authorName);
      formData.append("prezimeAutor", authorLastName);
      formData.append("emailAutor", emailAuthor);
      formData.append("file", fileName);

      try {
        const posterResponse = await axios.post(
          `/api/poster/${selectedConference.konfid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (posterResponse.status === 200) {
          setAuthorName("");
          setAuthorLastName("");
          setEmailAuthor("");
          setPosterName("");
          setFileName("");
          setSelectedConference("");
          setSelectedConferenceIndex(null);
          console.log("Poster uploaded");
        } else {
          console.error("Error fetching posters:", posterResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      alert("Odaberite konferenciju");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : (
        <div className="all-container">
          <div className="conference-list-container">
            <h2>Lista konferencija</h2>
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
                  <p>
                    Datum i vrijeme početka:{" "}
                    {dateTimeFormater(conference.startTime)}
                  </p>
                  <p>
                    Datum i vrijeme kraja:{" "}
                    {dateTimeFormater(conference.endTime)}
                  </p>
                  <p>
                    Adresa: {conference.mjesto.ulica}{" "}
                    {conference.mjesto.kucBroj}, {conference.mjesto.pbr}{" "}
                    {conference.mjesto.nazivMjesta}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="poster-container">
            <h2 className="subtitle">
              Odaberi konferenciju i dodaj novi poster
            </h2>

            <div className="author-info">
              <h3>Podaci o autoru</h3>
              <label>
                Ime:
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
                Prezime:
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
                Email:
                <input
                  type="text"
                  name="emailAuthor"
                  value={emailAuthor}
                  onChange={(e) => setEmailAuthor(e.target.value)}
                  className="input-field"
                  required
                />
              </label>
            </div>

            <div className="poster-info">
              <h3>Podaci o posteru</h3>
              <label>
                Naziv:
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
                Slika:
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setFileName(e.target.files[0])}
                  className="input-field"
                  required
                />
              </label>
            </div>
            <div className="button-container">
              <button
                type="submit"
                className="submit-button"
                onClick={handleSubmit}
              >
                Dodaj
              </button>
            </div>
            {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
          </div>
        </div>
      )}
    </>
  );
};

export default AddPoster;
