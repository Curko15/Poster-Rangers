import React, { useState } from "react";
import axios from "axios";
import { getAuthToken } from "../services/AuthService";
import { BounceLoader } from "react-spinners";
import ConferenceList from "./ConferenceList";
import { KonfKorisnikData } from "../services/DataService";

import "../css/addPoster.css";

const AddPoster = () => {
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState("");
  const [emailAuthor, setEmailAuthor] = useState("");
  const [posterName, setPosterName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [fileName, setFileName] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [resetSelectedConferenceIndex, setResetSelectedConferenceIndex] =
    useState(false);

  const handleSelectConference = (conference) => {
    setSelectedConference(conference);
  };

  KonfKorisnikData(setConferences, setIsLoading);

  const handleSubmit = async () => {
    setSuccessMessage("");
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
          setResetSelectedConferenceIndex(true);
          setErrorMessage("");
          setSuccessMessage("Uspješno dodan novi poster!");
          console.log("Poster uploaded");
        } else {
          console.error("Error fetching posters:", posterResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      setErrorMessage("Odaberite konferenciju");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : conferences.length === 0 ? (
        <h2>Prvo dodajte konferenciju da biste joj mogli pridružiti poster!</h2>
      ) : (
        <div className="all-container">
          <ConferenceList
            conferences={conferences}
            onSelectConference={handleSelectConference}
            resetSelectedConferenceIndex={resetSelectedConferenceIndex}
            onResetSelectedConferenceIndex={() =>
              setResetSelectedConferenceIndex(false)
            }
          />
          <div className="poster-container">
            <h2 className="subtitle">
              Odaberi konferenciju i dodaj novi poster
            </h2>
            {successMessage && (
              <h2 className="success-message">{successMessage}</h2>
            )}
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
