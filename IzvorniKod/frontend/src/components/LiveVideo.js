import React from "react";
import YouTube from "react-youtube";

class LiveVideo extends React.Component {
  render() {
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
          <YouTube videoId="4kLviL8XwAI" opts={options} id="live-video" />
        </div>
      </div>
    );
  }
}

export default LiveVideo;
