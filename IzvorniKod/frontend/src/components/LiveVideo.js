import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getConferenceData } from "../services/AuthService";

const LiveVideo = () => {
  const youtubeUrl = getConferenceData().live;
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const regex =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = youtubeUrl.match(regex);

    if (match) {
      setVideoId(match[1]);
    } else {
      //Default
      setVideoId("4kLviL8XwAI");
    }
  }, [youtubeUrl]);

  const options = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  return (
    <div className="outer-container">
      <div className="centered-video">
        <YouTube videoId={videoId} opts={options} id="live-video" />
      </div>
    </div>
  );
};

export default LiveVideo;
