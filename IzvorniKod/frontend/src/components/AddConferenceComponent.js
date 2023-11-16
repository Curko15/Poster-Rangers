import React, { useState, useRef } from "react";
import axios from "axios";
import { getAuthToken } from "../services/AuthService";

const AddConferenceComponent = () => {
  const [conferenceName, setConferenceName] = useState("");
  const [conferenceDateStart, setConferenceDateStart] = useState("");
  const [conferenceDateEnd, setConferenceDateEnd] = useState("");
  const [conferenceLocation, setConferenceLocation] = useState("");
  const [conferencePassword, setConferencePassword] = useState("");
  const [conferencePbr, setConferencePbr] = useState("");
  const [conferenceStreet, setConferenceStreet] = useState("");
  const [conferenceStreetNumber, setConferenceStreetNumber] = useState("");

  const formContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();

    if (new Date(conferenceDateStart) < currentDate) {
      alert("Datum početka konferencije je prošao.");
      return;
    }

    if (new Date(conferenceDateEnd) < currentDate) {
      alert("Datum završetka konferencije je prošao");
      return;
    }

    if (new Date(conferenceDateEnd) < new Date(conferenceDateStart)) {
      alert("Datum završetka mora biti nakon datuma početka");
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
        "http://localhost:8081/api/konferencija/addKonf",
        conference,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken().token,
          },
        },
      );

      if (response.status === 200) {
        console.log("Conference submitted successfully");
      } else {
        console.error("Failed to submit conference");
      }
    } catch (error) {
      console.error("Error submitting conference:", error.message);
    }
  };

  return (
    <div className="center-container">
      <div ref={formContainerRef} className="login-container">
        <h2>Add Conference</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Conference Name:
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
            Date Start:
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
            Date End:
            <input
              type="datetime-local"
              name="endTime"
              value={conferenceDateEnd}
              className="input-field"
              required
              onChange={(e) => setConferenceDateEnd(e.target.value)}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={conferencePassword}
              className="input-field"
              required
              onChange={(e) => setConferencePassword(e.target.value)}
            />
          </label>

          <label>
            Location:
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
            Street:
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
            Street Number:
            <input
              type="number"
              name="streetNumber"
              value={conferenceStreetNumber}
              className="input-field"
              required
              onChange={(e) => setConferenceStreetNumber(e.target.value)}
            />
          </label>

          <label>
            PBR (Postal Code):
            <input
              type="number"
              name="pbr"
              value={conferencePbr}
              className="input-field"
              required
              onChange={(e) => setConferencePbr(e.target.value)}
            />
          </label>

          <button type="submit">Submit Conference</button>
        </form>
      </div>
    </div>
  );
};

export default AddConferenceComponent;
