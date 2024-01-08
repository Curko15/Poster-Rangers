import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken, getLoggedInUser } from "../services/AuthService";
import { BounceLoader } from "react-spinners";
import ConferenceList from "./ConferenceList";

import "../css/addPhoto.css";

const AddGalleryPhotos = () => {
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState("");

  const [photoName, setPhotoName] = useState("");
  const [fileName, setFileName] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [resetSelectedConferenceIndex, setResetSelectedConferenceIndex] =
    useState(false);

  const handleSelectConference = (conference) => {
    setSelectedConference(conference);
  };

  useEffect(() => {
    const fetchConferences = async () => {
      const params = {
        email: getLoggedInUser().userEmail,
      };
      try {
        const response = await axios.post(
          "/api/konferencija/getKorisnikKonf",
          params,
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const handleSubmit = async () => {
    if (selectedConference) {
      if (!photoName || !fileName) {
        setErrorMessage("Sva polja su obavezna!");
        return;
      }
      const formData = new FormData();
      formData.append("nazivPoster", photoName);
      formData.append("file", fileName);

      try {
        const posterResponse = await axios.post(
          `/api/fotomaterijal/${selectedConference.konfid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (posterResponse.status === 200) {
          setPhotoName("");
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
      alert("Odaberite konferenciju");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : conferences.length === 0 ? (
        <h2>
          Prvo dodajte konferenciju da biste joj mogli pridružiti fotografiju!
        </h2>
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
          <div className="photo-container">
            <h2 className="subtitle">
              Odaberi konferenciju i dodaj novu fotografiju
            </h2>
            {successMessage && (
              <h2 className="success-message">{successMessage}</h2>
            )}

            <div className="photo-info">
              <h3>Podaci o posteru</h3>
              <label>
                Naziv:
                <input
                  type="text"
                  name="posterName"
                  value={photoName}
                  onChange={(e) => setPhotoName(e.target.value)}
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

export default AddGalleryPhotos;
