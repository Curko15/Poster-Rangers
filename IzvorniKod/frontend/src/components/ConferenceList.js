import React, { useEffect, useState } from "react";
import "../css/conferenceList.css";

const ConferenceList = ({
  conferences,
  onSelectConference,
  resetSelectedConferenceIndex,
  onResetSelectedConferenceIndex,
}) => {
  const [selectedConferenceIndex, setSelectedConferenceIndex] = useState(null);

  useEffect(() => {
    if (resetSelectedConferenceIndex) {
      setSelectedConferenceIndex(null);
      onResetSelectedConferenceIndex();
    }
  }, [resetSelectedConferenceIndex, onResetSelectedConferenceIndex]);

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

  const handleConferenceClick = (conference, index) => {
    setSelectedConferenceIndex(index);
    onSelectConference(conference);
  };

  return (
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
              Datum i vrijeme početka: {dateTimeFormater(conference.startTime)}
            </p>
            <p>Datum i vrijeme kraja: {dateTimeFormater(conference.endTime)}</p>
            <p>
              Adresa: {conference.mjesto.ulica} {conference.mjesto.kucBroj},{" "}
              {conference.mjesto.pbr} {conference.mjesto.nazivMjesta}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConferenceList;
