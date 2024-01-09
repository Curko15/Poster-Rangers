import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken, getLoggedInUser } from "../services/AuthService";
import { BounceLoader } from "react-spinners";
import ConferenceList from "./ConferenceList";

import "../css/addPromo.css";

const AddPromo = () => {
  const [promoName, setPromoName] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [fileName, setFileName] = useState("");

  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [resetSelectedConferenceIndex, setResetSelectedConferenceIndex] =
    useState(false);

  const handleSelectConference = (conference) => {
    setSelectedConference(conference);
  };

  useEffect(() => {
    const params = {
      email: getLoggedInUser().userEmail,
    };
    const fetchConferences = async () => {
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
    setSuccessMessage("");
    if (selectedConference) {
      if (!promoName || !fileName) {
        setErrorMessage("Sva polja su obavezna!");
        return;
      }
      const formData = new FormData();
      formData.append("nazivPromo", promoName);
      formData.append("url", companyURL);
      formData.append("file", fileName);

      try {
        const posterResponse = await axios.post(
          `/api/promomaterijal/${selectedConference.konfid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (posterResponse.status === 200) {
          setPromoName("");
          setCompanyURL("");
          setFileName("");
          setSelectedConference("");
          setResetSelectedConferenceIndex(true);
          setErrorMessage("");
          setSuccessMessage("Uspješno dodan novi promotivni materijal!");
          console.log("Promo uploaded");
        } else {
          console.error("Error fetching promos:", posterResponse.statusText);
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
        <h2>
          Prvo dodajte konferenciju da biste joj mogli pridružiti promotivni
          materijal!
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
          <div className="promo-container">
            <h2 className="subtitle">
              Odaberi konferenciju i pridruži joj njen promotivni materijal
            </h2>
            {successMessage && (
              <h2 className="success-message">{successMessage}</h2>
            )}
            <div className="company-info">
              <h3>Podaci o promotoru</h3>
              <label>
                URL tvrtke:
                <input
                  type="text"
                  name="companyURL"
                  value={companyURL}
                  onChange={(e) => setCompanyURL(e.target.value)}
                  className="input-field"
                  required
                />
              </label>
            </div>

            <div className="promo-info">
              <h3>Podaci o promotivnom materijalu</h3>
              <label>
                Naziv:
                <input
                  type="text"
                  name="promoName"
                  value={promoName}
                  onChange={(e) => setPromoName(e.target.value)}
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

export default AddPromo;
