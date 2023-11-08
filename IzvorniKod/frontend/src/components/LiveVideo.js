import React from "react";
import YouTube from 'react-youtube';

class LiveVideo extends React.Component {
    render() {
        const options = {
            width: '1280',
            height: '720',
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };

        return (
          <div className="live-video-container">
            <YouTube
              videoId="4kLviL8XwAI"
              opts={options}
              onReady={this._onReady}
              id="video"
            />
          </div>
        );
    }

    _onReady(event) {
        event.target.pauseVideo()
    }
}

export default LiveVideo;
