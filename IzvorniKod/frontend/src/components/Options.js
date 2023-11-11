import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/options.css";

const Options = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handlePosterClick = () => {
    navigate("/posteri");
  };

  const handleVoteClick = () => {
    navigate("/glasanje");
  };

  return (
    <>
      <button className="posterButton" onClick={handleOptionsClick}>
        Poster
      </button>
      <div
        className="options"
        style={{ display: showOptions ? "flex" : "none" }}
      >
        <button onClick={handlePosterClick}>Posteri</button>
        <button onClick={handleVoteClick}>Glasanje</button>
      </div>
    </>
  );
};

export default Options;
