import React, { useState, useRef } from "react";
import axios from "axios";
import { getAuthToken } from "../services/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AddConference = () => {
  const [conferenceName, setConferenceName] = useState("");
  const [conferenceDateStart, setConferenceDateStart] = useState("");
  const [conferenceDateEnd, setConferenceDateEnd] = useState("");
  const [conferenceLocation, setConferenceLocation] = useState("");
  const [conferencePassword, setConferencePassword] = useState("");
  const [conferencePbr, setConferencePbr] = useState("");
  const [conferenceStreet, setConferenceStreet] = useState("");
  const [conferenceStreetNumber, setConferenceStreetNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formContainerRef = useRef(null);

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setConferencePassword(code.toString());
  };

  const codeCheckUp = async (code) => {
    try {
      const response = await axios.post(
        "/api/konferencija/checkKonfCode",
        code,
        {
          headers: {
            Authorization: "Bearer " + getAuthToken().token,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      return false;
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isUnique = await codeCheckUp(conferencePassword);

      if (!isUnique) {
        setErrorMessage(
          "Konferencija s istim kodom već postoji. Generirajte novi kod.",
        );
        return;
      }

      const currentDate = new Date();
      if (new Date(conferenceDateStart) < currentDate) {
        setErrorMessage("Datum početka konferencije je prošao.");
        return;
      }

      if (new Date(conferenceDateEnd) < currentDate) {
        setErrorMessage("Datum završetka konferencije je prošao");
        return;
      }

      if (new Date(conferenceDateEnd) < new Date(conferenceDateStart)) {
        setErrorMessage("Datum završetka mora biti nakon datuma početka");
        return;
      }

      if (
        !conferenceName ||
        !conferenceDateStart ||
        !conferenceDateEnd ||
        !conferencePassword ||
        !conferenceLocation ||
        !conferencePbr ||
        !conferenceStreet ||
        !conferenceStreetNumber
      ) {
        setErrorMessage("Molimo unesite sve podatke");
        return;
      }

      const conference = {
        ime: conferenceName,
        startTime: conferenceDateStart,
        endTime: conferenceDateEnd,
        nazivMjesta: conferenceLocation,
        password: conferencePassword,
        pbr: conferencePbr,
        ulica: conferenceStreet,
        kucBroj: conferenceStreetNumber,
      };

      try {
        const response = await axios.post(
          "/api/konferencija/addKonf",
          conference,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getAuthToken().token,
            },
          },
        );

        if (response.status === 200) {
          setConferenceName("");
          setConferenceDateStart("");
          setConferenceDateEnd("");
          setConferencePassword("");
          setConferenceLocation("");
          setConferenceStreet("");
          setConferenceStreetNumber("");
          setConferencePbr("");
          setErrorMessage("");
          console.log("Conference submitted successfully");
        } else {
          console.error("Failed to submit conference");
        }
      } catch (error) {
        console.error("Error submitting conference:", error.message);
      }
    } catch (error) {
      console.error("Error checking conference code:", error.message);
    }
  };

  return (
    <div className="center-container">
      <div ref={formContainerRef} className="form-container">
        <h2>Dodaj konferenciju</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Ime:
            <input
              type="text"
              name="ime"
              value={conferenceName}
              className="input-field"
              required
              onChange={(e) => setConferenceName(e.target.value)}
            />
          </label>

          <label>
            Datum i vrijeme početka:
            <input
              type="datetime-local"
              name="startTime"
              value={conferenceDateStart}
              className="input-field"
              required
              onChange={(e) => setConferenceDateStart(e.target.value)}
            />
          </label>

          <label>
            Datum i vrijeme kraja:
            <input
              type="datetime-local"
              name="endTime"
              value={conferenceDateEnd}
              className="input-field"
              required
              onChange={(e) => setConferenceDateEnd(e.target.value)}
            />
          </label>

          <label className="password-input-container">
            Pristupni kod:
            <div className="input-with-button">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={conferencePassword}
                className="input-field"
                required
                onChange={(e) => setConferencePassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={handleTogglePassword}
              />
            </div>
          </label>

          <label>
            Mjesto:
            <input
              type="text"
              name="location"
              value={conferenceLocation}
              className="input-field"
              required
              onChange={(e) => setConferenceLocation(e.target.value)}
            />
          </label>

          <label>
            Ulica:
            <input
              type="text"
              name="street"
              value={conferenceStreet}
              className="input-field"
              required
              onChange={(e) => setConferenceStreet(e.target.value)}
            />
          </label>

          <label>
            Kućni broj:
            <input
              type="number"
              name="streetNumber"
              value={conferenceStreetNumber}
              className="input-field"
              required
              min={1}
              onChange={(e) => setConferenceStreetNumber(e.target.value)}
            />
          </label>

          <label>
            Poštanski broj:
            <input
              type="number"
              name="pbr"
              value={conferencePbr}
              className="input-field"
              required
              min={1}
              onChange={(e) => setConferencePbr(e.target.value)}
            />
          </label>

          <div className="button-container">
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              Dodaj
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={generateCode}
            >
              Generiraj kod
            </button>
          </div>
        </form>
        {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
      </div>
    </div>
  );
};

export default AddConference;
