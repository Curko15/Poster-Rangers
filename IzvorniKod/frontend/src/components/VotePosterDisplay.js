import React, { useEffect, useState } from "react";
import "../css/posterDisplay.css";

const VotePosterDisplay = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://fastly.picsum.photos/id/612/200/300.jpg?hmac=vJ35AV5-TQa5ET5az0aESTnI3zaFCjRYD9OnYaiYIYc",
      "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0",
      "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0",
      "https://fastly.picsum.photos/id/1084/200/300.jpg?hmac=JQMQbKvpN6_d6r-fiuOEYe1Dz6f2gfGIkTvsx0nLJUQ",
      "https://fastly.picsum.photos/id/612/200/300.jpg?hmac=vJ35AV5-TQa5ET5az0aESTnI3zaFCjRYD9OnYaiYIYc",
      "https://fastly.picsum.photos/id/612/200/300.jpg?hmac=vJ35AV5-TQa5ET5az0aESTnI3zaFCjRYD9OnYaiYIYc",
      "https://fastly.picsum.photos/id/1084/200/300.jpg?hmac=JQMQbKvpN6_d6r-fiuOEYe1Dz6f2gfGIkTvsx0nLJUQ",
    ]);
  }, []);

  return (
    <div className="posterDisplay">
      {images.map((image, index) => (
        <div className="posterVote">
          <img className="poster" src={image} alt={`poster-${index}`} />
          <div className="vote">
            <button className="voteButton">Glasaj</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VotePosterDisplay;
